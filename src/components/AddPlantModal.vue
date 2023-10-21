<template>
  <div class="modal  ">
    
    <div class="modal-content rb flex flex-col justify-evenly ">
      <h1 class="heading text-4xl font-semibold absolute  text-center  mb-5">Add your plant</h1>
      <div class="plant-card flex flex-row rb gap-5 relative">

        <button class="pt-4 pr-4" @click="$emit('close')">
              <svg class="close-btn" xmlns="http://www.w3.org/2000/svg" width="17.828" height="17.828">
                  <path d="m2.828 17.828 6.086-6.086L15 17.828 17.828 15l-6.086-6.086 6.086-6.086L15 0 8.914 6.086 2.828 0 0 2.828l6.085 6.086L0 15l2.828 2.828z"/>
              </svg>
          </button>
        
        
      <!-- Modal content for adding a new plant -->
        <div class="plant-selection w-5/12  flex flex-col gap-5    ">
          <input
            type="text"
            class="search__input"
            v-model="searchQuery"
            @input="handleInput"
            placeholder="Search for a plant..."
          />
          <ul v-if="searchQuery" class="suggestions overflow-auto h-40 m-5 w-full bg-sky-300">
            <li v-if="isLoading">
              Loading...
            </li>
            <li v-else-if="!plantResults.length && !isLoading">
              No results, please type in the input
            </li>
            <template v-else>
              <li class="overflow-hidden" v-for="plant in plantResults" :key="plant.id" @click="selectPlant(plant)">
                {{ plant.common_name }}
              </li>
            </template>
          </ul>
          <div class="relative rb  ">
            <label for="siteSelection">Select a Site:</label>
            <select id="siteSelection" v-model="selectedSite">
              <option value="">...</option>
              <option v-for="site in sites" :key="site.id" :value="site.id">{{ site.name }}</option>
            
            </select>
            <button @click="openAddSiteModal"> createNewSite</button>
            <teleport to="body">
              <AddSiteModal
                v-if="isAddSiteModalOpen"
                @close="closeAddSiteModal"
                @confirm="onConfirm"
              />
            </teleport>
           
          </div>
        </div>
          
        

        <div class="flex flex-col w-5/12" v-if="selectedPlant">
          <h3>{{ selectedPlant.common_name }}</h3>
          <p>{{ selectedPlant.scientific_name.join(', ') }}</p>
          <img :src="selectedPlant.default_image.medium_url" alt="Plant Image" />
          <p>Water Frequency: {{ selectedPlant.watering_general_benchmark.value }} {{ selectedPlant.watering_general_benchmark.unit }}</p>
          <p>Light Conditions: {{ selectedPlant.sunlight.join(', ') }}</p>
          <p>Care Level: {{ selectedPlant.care_level }}</p>
          <button @click="confirmPlantSelection">Add Plant</button>
          
          <div class="error-message" v-if="!selectedSite">Please select a site before adding the plant.</div>
        </div>
        
      <!-- You can add your form elements and UI here -->
       

        
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

.modal-content {
  height: 80vh;
  color: $black;
  .heading {
    top: 1%;
    right: 50%;
    transform: translate(50%, 1%);
    font-family: $title-font;
  }
  .plant-card{
    background-color: $lightgray;
    padding: 3em 4em;
    font-family: $title-font;
  }
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
