<template>
  <div class="modal flex flex-col gap-3">

    <button class="button" @click="$emit('close')">Close</button>
    <!-- Modal content for adding a new plant -->
    <div class="plant-selection">
      <input
        type="text"
        class="search__input"
        v-model="searchQuery"
        @input="fetchPlant"
        placeholder="Search for a plant..."
      />

      <ul class="suggestions">
        <li v-for="suggestion in filteredPlantData" :key="suggestion.id" @click="selectPlant(suggestion)">
          {{ suggestion.common_name }}
        </li>
      </ul>

      <div v-if="selectedPlant">
        <h3>{{ selectedPlant.common_name }}</h3>
        <p>{{ selectedPlant.details.scientific_name }}</p>
        <img :src="selectedPlant.image_url" alt="Plant Image" />
        <p>Water Frequency: {{ selectedPlant.details.watering_general_benchmark }}</p>
        <p>Light Conditions: {{ selectedPlant.details.light_conditions }}</p>
        <p>Care Level: {{ selectedPlant.details.care_level }}</p>
        <button @click="confirmPlantSelection">Confirm</button>
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
</template>


<script setup>
import { ref, onMounted, computed, } from 'vue'; // Import defineProps
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { fetchPlants } from '../modules/plantapi';

const searchQuery = ref('');
const selectedPlant = ref(null);
const data = ref([]);



const filteredPlantData = computed(() => {
  return data.value.filter((plant) => {
    return plant.common_name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

const fetchPlantData = async () => {
  try {
    const plants = await fetchPlants();
    data.value = plants;
  } catch (error) {
    console.error(`Error fetching plant data: ${error.message}`);
  }
};

onMounted(fetchPlantData);

const selectPlant = (plant) => {
  selectedPlant.value = plant;
};

const confirmPlantSelection = async () => {
  if (selectedPlant.value) {
    try {
      const plantCollection = collection(db, 'plants');
      const newPlantDoc = await addDoc(plantCollection, {
        common_name: selectedPlant.value.common_name,
        scientific_name: selectedPlant.value.details.scientific_name, // Corrected reference
        image_url: selectedPlant.value.image_url,
        water_frequency: selectedPlant.value.details.watering_general_benchmark, // Corrected reference
        light_conditions: selectedPlant.value.details.light_conditions, // Corrected reference
        care_level: selectedPlant.value.details.care_level, // Corrected reference
      });

      console.log('Plant added with ID: ', newPlantDoc.id);
      selectedPlant.value = null;
    } catch (error) {
      console.error('Error adding plant: ', error);
    }
  }
};





const selectedSite = ref('');
const sites = ref([]);

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
console.log('Sites: ', sites.value);

onMounted(fetchSites);


const onConfirm = () => {
  // Handle the confirm logic here
  console.log('Confirm button clicked');
};

</script>

<style lang="scss">

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
