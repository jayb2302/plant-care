<template>
  <div class="modal flex flex-col gap-3">
    <div class="modal-content">
      <h2 class="h2 text-center">Add a new plant</h2>
      <button class="button" @click="$emit('close')">Close</button>
    <!-- Modal content for adding a new plant -->
      <div class="plant-selection ">
        <input
          type="text"
          class="search__input"
          v-model="searchQuery"
          @input="handleInput"
          placeholder="Search for a plant..."
        />


    
        <ul v-if="!selectedPlant" class="suggestions">
          <li v-if="!plantResults.length">
            No results, please type in the input
          </li>
          <template v-else>
            <li v-for="plant in plantResults" :key="plant.id" @click="selectPlant(plant)">
              {{ plant.common_name }}
            </li>
          </template>
        </ul>


      <div v-if="selectedPlant">
        <h3>{{ selectedPlant.common_name }}</h3>
        <p>{{ selectedPlant.scientific_name.join(', ') }}</p>
        <img :src="selectedPlant.default_image.medium_url" alt="Plant Image" />
        <p>Water Frequency: {{ selectedPlant.watering_general_benchmark.value }} {{ selectedPlant.watering_general_benchmark.unit }}</p>
        <p>Light Conditions: {{ selectedPlant.sunlight.join(', ') }}</p>
        <p>Care Level: {{ selectedPlant.care_level }}</p>
        <button @click="confirmPlantSelection">Confirm</button>
        <button @click="unselectPlant">Unselect plant</button>
      </div>
    </div>
    <!-- You can add your form elements and UI here -->
    <div>
      <label for="siteSelection">Select a Site:</label>
      <select id="siteSelection" v-model="selectedSite">
        <option value="">Select a site</option>
        <option v-for="site in sites" :key="site.id" :value="site.id">{{ site.name }}</option>
      </select>
      
      
    </div>
    <div class="flex flex-col">
      <button class="button" @click="onConfirm">Confirm</button>
     
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


const searchQuery = ref('');
const selectedPlant = ref(null);
const selectedSite = ref('');
const sites = ref([]);
const plantResults = ref([])

const performSearchRequest = async () => {
  const data = await getPlantList({
    q: searchQuery.value
  })

  plantResults.value = data
}

const handleInput = debounce(() => {
    performSearchRequest()
}, 300)

const selectPlant = async (plant) => {
  const data = await getPlantById(plant.id)
  selectedPlant.value = data;
};

const unselectPlant = () => {
  selectPlant.value = null
}



const confirmPlantSelection = async () => {
  if (selectedPlant.value && selectedSite.value) {
    try {
      const plantCollection = collection(db, 'plants');
      const newPlantDoc = await addDoc(plantCollection, {
        common_name: selectedPlant.value.common_name,
        scientific_name: selectedPlant.value.scientific_name, // Corrected reference
        image_url: selectedPlant.value.default_image.medium_url,
        water_frequency: selectedPlant.value.watering_general_benchmark, // Corrected reference
        light_conditions: selectedPlant.value.sunlight, // Corrected reference
        care_level: selectedPlant.value.details.care_level, // Corrected reference
        // Reference fyrir hvaða herbergi
        siteId: selectedSite.value.id
      });

      console.log('Plant added with ID: ', newPlantDoc.id);
      selectedPlant.value = null;
    } catch (error) {
      console.error('Error adding plant: ', error);
    }
  }
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


const onConfirm = () => {
  // Handle the confirm logic here
  console.log('Confirm button clicked');
};

onMounted(fetchSites);

</script>

<style lang="scss">
.modal-content {
        background-color: $darkPink;
        background-image: url('../assets/img/plantcarebg.png');
        background-size: contain;
        background-position-y: 50%;
        width: 100%;
        .h2{
            color: $white;
            font-family: $heading-font;
            font-weight: 400;
            font-size: 5rem;
            text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5), 0 0 1em rgba(0, 0, 0, 0.5);
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
