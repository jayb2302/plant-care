<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-for="plant in newPlantName" :key="plant.id">
      <h2>{{ plant.common_name }}</h2>
      <img :src="plant.default_image ? plant.default_image.small_url : ''" alt="Plant Image" /> <!--  Ternary operator -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const newPlantName = ref([]);

const addPlantFromAPI = async () => {
  try {
    // standard API : "https://perenual.com/api/species-list?key=sk-zJcM64f8ab371b9ff1929" 
    // standard API : https://perenual.com/api/species-list?key=[YOUR-API-KEY]
    const response = await fetch("https://perenual.com/api/species-list?key=sk-zJcM64f8ab371b9ff1929&page=3");
    const data = await response.json();
    if (data.data && Array.isArray(data.data)) {
      newPlantName.value = data.data;
    } else {
      console.error('API response does not have the expected structure:', data);
    }
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  addPlantFromAPI();
});
</script>
