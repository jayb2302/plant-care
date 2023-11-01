<template>
  <div class="modal">
    <div class="modal-content relative flex  flex-col  ">
      <h1 class="heading text-3xl font-semibold pb-3 text-center ">Add your plant</h1>
      <button class="absolute top-5 right-5" @click="$emit('close')">
          <svg class="close-btn" xmlns="http://www.w3.org/2000/svg" width="17.828" height="17.828">
              <path d="m2.828 17.828 6.086-6.086L15 17.828 17.828 15l-6.086-6.086 6.086-6.086L15 0 8.914 6.086 2.828 0 0 2.828l6.085 6.086L0 15l2.828 2.828z"/>
          </svg>
      </button>
      <div class="plant-card md:flex ">
        <div class="plantInputContainer md:w-1/3">
          <input
              type="text"
              class="search__input p-1 mb-2 lg:md-5 text-center "
              v-model="searchQuery"
              @input="handleInput"
              placeholder="Search plant species…"
            />
        <!-- Modal content for adding a new plant -->
          <div class="plant-selection relative overflow-y-auto  md:flex md:flex-col md:gap-2  ">
          </div>
          <div class="flex">
            <ul v-if="searchQuery" class="suggestions w-full overflow-auto  ">
              <li class="p-2" v-if="isLoading">
                <h2 class="pl-2 p-2"> Loading ...</h2> 
              </li>
              <li class="p-2" v-else-if="!plantResults.length && !isLoading">
                <h2 class="pl-3 pb-2" >No results, please type in the input</h2>
              </li>
              <template v-else>
                <li class="overflow-hidden w-full flex flex-col pl-2 p-2" v-for="plant in plantResults" :key="plant.id" @click="selectPlant(plant)">
                  <h2 class=" pl-2 ">{{ plant.common_name }} </h2>
                </li>
              </template>
            </ul>
          </div>
          
          <div class="flex flex-col gap-1 mt-3 md:gap-3">
            <input placeholder="Name your plant" class="__input "  v-model="plant_nickname" type="text" id="plant_nickname"/>
            <label name="lastWateredDate">Last Watering Date</label>
            <input type="date" id="lastWateredDate" v-model="lastWateredDate"/>
       
            <div class="btn-wrapper flex mt-5 gap-1">
              <select class="site-input" id="siteSelection" v-model="selectedSite">
                <option value="">Select a Site or...</option>
                <option v-for="site in sites" :key="site.id" :value="site.id">{{ site.name }}</option>
              </select>
              <button class="site-btn" @click="openAddSiteModal"> 
                Make New 
              </button>
            </div>
          </div>

          <div class="flex flex-col ">
          </div>
        </div>
        
        <div class="plantSuggestion-container md:relative flex  md:flex-col w-full md:w-2/3 items-center ">
          <div class="plantSuggestion-content w-full md:left-5 md:top-20 flex  flex-wrap mt-3" v-if="selectedPlant">
            <div class=" w-full flex ">
             <div class="text-sm md:text-lg flex-grow">
                <h2 class="">{{ selectedPlant.common_name }}</h2>
                <p class=" "><strong>{{ selectedPlant.scientific_name.join(', ') }}</strong></p>
                <p>Water every <strong>{{ selectedPlant.watering_general_benchmark.value }}</strong>  {{ selectedPlant.watering_general_benchmark.unit }}</p>
                <p><strong>Light needs</strong> <br> {{ selectedPlant.sunlight.join(', ') }}</p>
                <p><strong>Ease of Care </strong><br> {{ selectedPlant.care_level }}</p>
             </div>
             
              <img class="clip " :src="selectedPlant.default_image.small_url" alt="Plant Image" />
             
            </div>

            <button class="site-btn  mt-2 md:mt-5" @click="confirmPlantSelection">
              Add Plant
            </button>
            
            <div class="error-message w-full text-center" v-if="!selectedSite">Please select a site!</div>
          </div>            

          <div class="success-message pt-2 w-full text-center" v-if="showSuccessMessage">
            <strong class="success">
              Plant added successfully!
            </strong> 
          </div>  
        </div>
     
 
      </div>

      <teleport to="body">
        <AddSiteModal
          v-if="isAddSiteModalOpen"
          @close="closeAddSiteModal"
          @confirm="onConfirm"
        />
      </teleport>
    </div>
   
  </div>
</template>


<script setup props="props">
import { ref, onMounted, } from 'vue'; 
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { getPlantList, getPlantById } from '../modules/plantapi';
import { debounce } from 'lodash';
import AddSiteModal from './AddSiteModal.vue';
import { getCurrentUser } from '../auth.js';

const searchQuery = ref('');
const selectedPlant = ref(null);
const selectedSite = ref('');
const sites = ref([]);
const plantResults = ref([])
const isLoading = ref(false);
const lastWateredDate = ref('');
const plant_nickname = ref('');
const isAddSiteModalOpen = ref(false);
const showSuccessMessage = ref(false);

let userId; // Define userId here.

const setUser = async () => {
  const user = await getCurrentUser();
  if (user && user.uid) {
    userId = user.uid;
  } else {
    console.error('User is not authenticated or user data is unavailable.');
  }
};

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

    // Filter sites based on the current user's userId
    sites.value = siteData.filter((site) => site.userId === userId);
  } catch (error) {
    console.error('Error fetching sites: ', error);
  }
};
const confirmPlantSelection = async () => {
  if (selectedPlant.value && selectedSite.value && userId) {
    const newPlantDoc = await addPlantToFirestore(selectedPlant.value, selectedSite.value, plant_nickname.value, userId);
    if (newPlantDoc) {
      console.log('Plant added with ID: ', newPlantDoc.id);
      // Reset the selected plant, query, and success message
      selectedPlant.value = null;
      searchQuery.value = '';
      showSuccessMessage.value = true;
    } else {
      console.error('Error adding the plant. Handle this case appropriately.');
    }
  }
};


const addPlantToFirestore = async (plantData, siteId, plant_nickname, userId) => {
  if (!userId) {
    console.error('User is not authenticated or user data is unavailable.');
    return null; // Return null in case of an error
  }

  const plantCollection = collection(db, 'plants');

  try {
    // Create a new document in the 'plants' collection with the selected plant's details
    const newPlantDoc = await addDoc(plantCollection, {
      siteId: siteId,
      userId: userId,
      plant_nickname: plant_nickname,
      common_name: plantData.common_name,
      scientific_name: plantData.scientific_name.join(', '),
      image_url: plantData.default_image.medium_url,
      water_frequency: `${plantData.watering_general_benchmark.value} ${plantData.watering_general_benchmark.unit}`,
      light_conditions: plantData.sunlight.join(', '),
      care_level: plantData.care_level,
      last_watered: lastWateredDate.value,
    });

    // Return the newly added document
    return newPlantDoc;
  } catch (error) {
    console.error('Error adding the plant: ', error);
    return null; // Return null in case of an error
  }
};




const openAddSiteModal = () => {
  // Set isAddSiteModalOpen to true to open the modal
  isAddSiteModalOpen.value = true;
};

const closeAddSiteModal = () => {
  // Set isAddSiteModalOpen to false to close the modal
  isAddSiteModalOpen.value = false;
};

const onConfirm = (siteId) => {
  // Set the selected site to the newly created site
  selectedSite.value = siteId;
  // Close the modal
  closeAddSiteModal();
};

onMounted(() => {
  setUser().then(() => {
    fetchSites();
  });
});

</script>

<style lang="scss">
.modal {
  .modal-content {
    font-family: $title-font;
    color: $black;
    .plant-card{
        font-family: $title-font;
        color: $black;
        gap: 20px;
        border: 1px solid rgba(69, 63, 63, 0.284);
        border-radius: 10px;
        box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;        overflow: hidden;
        padding: 1rem 1rem;
        background-color: $signinbg;
        height: auto;
      .suggestions {
        box-shadow: rgb(147, 149, 150) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
        height: 40vh;
        h2 {
          border-bottom: 2px dashed $lightgray;
          font-size: 1em;
        }
        @media screen and (max-width: 768px) {
          height: 15vh;
          
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
    transform: translate(.1em, -.1em);
    

    .leaf {
      opacity: 1;
      transform: translate(.2em, -.2em);
    }
  }
}
.clip {
  border: 1px solid $lightgray;
  box-shadow: 0 0 0 2px $beige;
  filter: drop-shadow(0 0 4px $black);
  width: 290px;
  height: 240px;
  @media screen and (max-width: 900px) {
    width: 150px;
    height: 150px;
  }
}
</style>
