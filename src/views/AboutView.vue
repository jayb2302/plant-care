<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-for="plant in newPlantName" :key="plant.id">
      <h2>{{ plant.common_name }}</h2>
      
      <img :src="plant.default_image ? plant.default_image.small_url : ''" alt="Plant Image" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchPlants } from '../modules/plantapi'; // Adjust the import path

const newPlantName = ref([]);

onMounted(async () => {
  try {
    newPlantName.value = await fetchPlants();
  } catch (error) {
    // Handle the error, e.g., show an error message to the user
    console.error(error);
  }
});
</script>

