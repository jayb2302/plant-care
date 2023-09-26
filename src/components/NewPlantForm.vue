<template>
  <div>NewPlant</div>
<!--     <form class="plantInputs flex flex-col w-1/2" @submit.prevent="addPlant">
      <h2 class="text-2xl text-center">New Plant</h2>
      <input v-model="newPlantName" type="text" placeholder="Enter Plant Name" id="plantName">
      <select v-model="newPlantLocation" id="plantLocation">
        <option value="kitchen">Kitchen</option>
        <option value="livingroom">Living Room</option>
        <option value="balcony">Balcony</option>
      </select>
      <input v-model="newPlantDescription" type="text" placeholder="Enter Plant Description" id="plantDescription">
      <input @change="uploadNewPlantImg" type="file" placeholder="Enter Plant Image URL" id="plantImageURL">
      <button type="submit">Add Plant</button>
    </form>
 -->  </template>
  <!-- 
  <script>
  import { ref } from 'vue';
  import { uploadPlantImage, addPlant } from '../modules/myplant.js';
  
  export default {
    data() {
      return {
        newPlantName: '',
        newPlantLocation: 'kitchen',
        newPlantDescription: '',
        imgURL: '',
      };
    },
    methods: {
      async addPlant() {
        if (!this.newPlantName.trim() || !this.newPlantLocation || !this.newPlantDescription.trim() || !this.imgURL) {
          // Handle validation error (e.g., show a message)
          return;
        }
  
        try {
          await addPlant({
            name: this.newPlantName,
            location: this.newPlantLocation,
            description: this.newPlantDescription,
            imgURL: this.imgURL,
            done: false,
          });
  
          // Reset input values
          this.newPlantName = '';
          this.newPlantLocation = 'kitchen';
          this.newPlantDescription = '';
          this.imgURL = '';
        } catch (error) {
          console.error('Error adding plant:', error);
          // Handle the error (e.g., show a message)
        }
      },
      async uploadNewPlantImg(event) {
        const file = event.target.files[0];
  
        if (!file) return;
  
        try {
          this.imgURL = await uploadPlantImage(file);
        } catch (error) {
          console.error('Error uploading image:', error);
          // Handle the error (e.g., show a message)
        }
      },
    },
  };
  </script> -->
  
  <style scoped>
  /* Add component-specific styles */
  </style>
  