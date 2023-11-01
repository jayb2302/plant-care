<template>
  <div></div>
</template>
<script></script>
<!-- <template>
  <div>
    <h2>Create a New Site</h2>
    <form @submit.prevent="createSite">
      <div class="form-group">
        <label for="siteName">Site Name</label>
        <input
          type="text"
          id="siteName"
          v-model="siteName"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="siteType">Select Site Type</label>
        <select
          id="siteType"
          v-model="siteType"
          class="form-control"
          required
        >
          <option value="" disabled>Select a site type</option>
          <option value="Living Room">Living Room</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Office">Office</option>
          <option value="Terrace">Terrace</option>
          <option value="Patio">Patio</option>
          <option value="Balcony">Balcony</option>
          <option value="Bathroom">Bathroom</option>
          <option value="Hallway">Hallway</option>
          <option value="Garden">Garden</option>
        </select>
      </div>
      <div class="form-group">
        <label for="siteDescription">Site Description</label>
        <textarea
          id="siteDescription"
          v-model="siteDescription"
          class="form-control"
          rows="4"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Create Site</button>
    </form>
  </div>
</template> 

<script>
// import { ref } from 'vue';
import { db } from '../firebase.js'; // Import your Firebase configuration

export default {
  data() {
    return {
      siteName: '',
      siteType: '',
      siteDescription: '',
    };
  },
  methods: {
    async createSite() {
      // Ensure the user is authenticated (You should implement Firebase Auth first)

      // Create a new site document in Firestore
      try {
        const siteData = {
          name: this.siteName,
          type: this.siteType,
          description: this.siteDescription,
          // Add other relevant site data
        };

        const siteRef = db.collection('sites'); // Replace 'sites' with your Firestore collection name
        const docRef = await siteRef.add(siteData);

        console.log('Site created with ID: ', docRef.id);

        // Optionally, you can reset the form fields after creating the site
        this.siteName = '';
        this.siteType = '';
        this.siteDescription = '';

        // You can also add a success message or redirect the user to their dashboard
      } catch (error) {
        console.error('Error creating site: ', error);
        // Handle the error and provide feedback to the user
      }
    },
  },
};
</script>

<style>
/* Add your CSS styling here */
</style>
-->