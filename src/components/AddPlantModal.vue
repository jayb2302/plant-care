<template>
  <div class="modal">
    
    <div class="modal-content relative flex  flex-col ">
      <h1 class="heading text-4xl font-semibold mb-5  text-center ">Add your plant</h1>
      <button class="absolute inset-5" @click="$emit('close')">
          <svg class="close-btn" xmlns="http://www.w3.org/2000/svg" width="17.828" height="17.828">
              <path d="m2.828 17.828 6.086-6.086L15 17.828 17.828 15l-6.086-6.086 6.086-6.086L15 0 8.914 6.086 2.828 0 0 2.828l6.085 6.086L0 15l2.828 2.828z"/>
          </svg>
      </button>
      <div class="plant-card flex flex-row w-full gap-5 relative">
        
        <!-- Modal content for adding a new plant -->
        <div class="plant-selection relative w-1/2  flex flex-col gap-5    ">
          <input
            type="text"
            class="search__input p-4 "
            v-model="searchQuery"
            @input="handleInput"
            placeholder="Search for a plant..."
          />
          <ul v-if="searchQuery" class="suggestions overflow-auto w-full">
            <li class="p-2" v-if="isLoading">
              <h2 class="pl-2 p-2"> Loading ...</h2> 
            </li>
            <li class="p-2" v-else-if="!plantResults.length && !isLoading">
              <h2 class="pl-3 pb-2" >No results, please type in the input</h2>
            </li>
            <template v-else>
              <li class="overflow-hidden flex flex-col pl-2 p-2" v-for="plant in plantResults" :key="plant.id" @click="selectPlant(plant)">
                <h2 class=" pb-2 ">{{ plant.common_name }} </h2>
              </li>
            </template>
          </ul>
          <div class=" flex flex-col ">
            <label for="siteSelection">Select a Site:</label>
            <select class="select" id="siteSelection" v-model="selectedSite">
              <option value="">...</option>
              <option v-for="site in sites" :key="site.id" :value="site.id">{{ site.name }}</option>
            </select>
           
           
          </div>
          <button class="button" @click="openAddSiteModal"> Create New Site</button>
          <div class="flex flex-col">
            <label for="lastWateredDate">Last Watered:</label>
            <input type="date" id="lastWateredDate" v-model="lastWateredDate" />
          </div>
            
        </div>
        <teleport to="body">
          <AddSiteModal
            v-if="isAddSiteModalOpen"
            @close="closeAddSiteModal"
            @confirm="onConfirm"
          />
        </teleport>
        
        <div class="plantSuggestion-container flex flex-col   items-center w-1/2">
          <div class="plantSuggestion-content" v-if="selectedPlant">
            <h2 class="text-xl">{{ selectedPlant.common_name }}</h2>
            <p class="pl-3 pb-3">{{ selectedPlant.scientific_name.join(', ') }}</p>
            <img :src="selectedPlant.default_image.small_url" alt="Plant Image" />
            <p>Water Frequency: {{ selectedPlant.watering_general_benchmark.value }} {{ selectedPlant.watering_general_benchmark.unit }}</p>
            <p>Light Conditions: {{ selectedPlant.sunlight.join(', ') }}</p>
            <p>Care Level: {{ selectedPlant.care_level }}</p>

            <div class="error-message" v-if="!selectedSite">Please select a site before adding the plant.</div>
            <button class="button w-full mt-2" @click="confirmPlantSelection">Add Plant</button>
            
          </div>
        </div>
     
 
        
      </div>
    </div>
   
  </div>
</template>


<script setup>
import { ref, onMounted, } from 'vue'; // Import defineProps
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { getPlantList, getPlantById } from '../modules/plantapi';
import { debounce } from 'lodash';
import AddSiteModal from './AddSiteModal.vue'; 


const searchQuery = ref('');
const selectedPlant = ref(null);
const selectedSite = ref('');
const sites = ref([]);
const plantResults = ref([])
const isLoading = ref(false);
const lastWateredDate = ref('');

const performSearchRequest = async () => {
  isLoading.value = true; // Show loading indicator
  const data = await getPlantList({
    q: searchQuery.value
  });
  isLoading.value = false; // Hide loading indicator
  plantResults.value = data;
}

const handleInput = debounce(() => {
    performSearchRequest()
}, 300)

const selectPlant = async (plant) => {
  const data = await getPlantById(plant.id)
  selectedPlant.value = data;
};







const fetchSites = async () => {
  try {
    const sitesCollection = collection(db, 'sites');
    const siteSnapshot = await getDocs(sitesCollection);
    const siteData = siteSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    sites.value = siteData;
  } catch (error) {
    console.error('Error fetching sites: ', error);
  }
};

const isAddSiteModalOpen = ref(false);



const confirmPlantSelection = async () => {
  if (selectedPlant.value && selectedSite.value) {
    const newPlantDoc = await addPlantToFirestore(selectedPlant.value, selectedSite.value);
    console.log('Plant added with ID: ', newPlantDoc.id);
    selectedPlant.value = null; // Clear the selected plant.
    searchQuery.value = ''; // Reset the search query
  }
};




const addPlantToFirestore = async (plantData, siteId) => {
  const plantCollection = collection(db, 'plants');

  // Create a new document in the 'plants' collection with the selected plant's details
  const newPlantDoc = await addDoc(plantCollection, {
    common_name: plantData.common_name,
    scientific_name: plantData.scientific_name.join(', '),
    image_url: plantData.default_image.medium_url,
    water_frequency: `${plantData.watering_general_benchmark.value} ${plantData.watering_general_benchmark.unit}`,
    light_conditions: plantData.sunlight.join(', '),
    care_level: plantData.care_level,
    last_watered: lastWateredDate.value,
    siteId: siteId
  });

  return newPlantDoc; // Return the newly added document
};

const openAddSiteModal = () => {
  // Set isAddSiteModalOpen to true to open the modal
  isAddSiteModalOpen.value = true;
};

const closeAddSiteModal = () => {
  // Set isAddSiteModalOpen to false to close the modal
  isAddSiteModalOpen.value = false;
};

onMounted(fetchSites);

</script>

<style lang="scss">
.modal {
  .modal-content {
    font-family: $title-font;
    color: $black;
 
    .plant-card{
        font-family: $title-font;
        color: $black;
        backdrop-filter: blur(10px);
        gap: 20px;
        border: 1px solid rgba(69, 63, 63, 0.284);
        border-radius: 10px;
        box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;        overflow: hidden;
        padding: 2rem 3rem;
        background-color: $signinbg;
        height: 80vh;
    .suggestions {
      box-shadow: rgb(147, 149, 150) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
      height: 40vh;
      h2 {
        border-bottom: 2px dashed $lightgray;
        font-size: 1.3em;
      }
    }
  
  }
 
}

}

.select {
  background-color: $input;
}

.button {
  position: relative;
  cursor: pointer;
  padding: 1em 1em;
  border: 0;
  border-radius: .5em;
  font-weight: bolder;
  transition: transform 150ms, box-shadow 150ms;
  box-shadow: 0 0 #999;
  background-color: #f1f1f1;
  color: #333;

  &:hover {
    transform: translate(.3em, -.3em);
    box-shadow: -.3em .3em #999;

    .leaf {
      opacity: 1;
      transform: translate(.2em, -.2em);
    }
  }
}




</style>
