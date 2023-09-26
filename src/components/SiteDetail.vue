<template>
    <div class="site-detail">
      <h1>Site Detail</h1>
      <p>Site ID: {{ $route.params.id }}</p>
      <div>
        <h2>Site Name:</h2>
       <!--  <p>{{ site.name }}</p> -->
      </div>
      <!-- Add more site details as needed -->
    </div>
  </template>
  
  <!-- 
<script>

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

export default {
  data() {
    return {
      site: {
        name: '',
        // Add more site details as needed
      },
    };
  },
  async mounted() {
    // Fetch site details based on the route parameter 'id'
    const siteId = this.$route.params.id;
    const siteRef = doc(db, 'sites', siteId);
    const siteDoc = await getDoc(siteRef);

    if (siteDoc.exists()) {
      // Update the 'site' data property with fetched site details
      this.site = siteDoc.data();
    } else {
      // Handle the case where the site does not exist
      console.error('Site not found');
    }
  },
};
</script>
 -->

  
  <style scoped>
  /* Add component-specific styles */
  </style>
  