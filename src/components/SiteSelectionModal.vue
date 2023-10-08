<template>
    <div class="modal" @click="closeModal">
      <!-- Modal content -->
      <div class="modal-content" @click.stop>
        <h2>Select a Site</h2>
        <div class="site-list">
          <!-- Render the list of sites with thumbnails and headings -->
          <div v-for="site in sites" :key="site.id" @click="selectSite(site)">
            <img :src="site.thumbnail" alt="Site Thumbnail" />
            <h3>{{ site.name }}</h3>
          </div>
        </div>
        <button @click="confirmSelection">Confirm</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  
  const { onConfirm } = defineProps(['onConfirm']);
  
  const sites = ref([
    { id: 1, name: 'Living Room', thumbnail: 'https://placehold.co/80x80' },
    { id: 2, name: 'Bedroom', thumbnail: 'https://placehold.co/80x80' },
    { id: 3, name: 'Kitchen', thumbnail: 'https://placehold.co/80x80' },
    { id: 4, name: 'Office', thumbnail: 'https://placehold.co/80x80' },
    { id: 5, name: 'Terrace', thumbnail: 'https://placehold.co/80x80' },
    { id: 6, name: 'Patio', thumbnail: 'https://placehold.co/80x80' },
    { id: 7, name: 'Balcony', thumbnail: 'https://placehold.co/80x80' },
    { id: 8, name: 'Bathroom', thumbnail: 'https://placehold.co/80x80' },
    { id: 9, name: 'Hallway', thumbnail: 'https://placehold.co/80x80' },
    { id: 10, name: 'Garden', thumbnail: 'https://placehold.co/80x80' },
  ]);
  
  const selectedSite = ref(null);
  
  const selectSite = (site) => {
    // Set the selected site
    selectedSite.value = site;
  };
  
  const confirmSelection = () => {
  // Check if a site is selected before confirming
  if (selectedSite.value) {
    // Emit the selected site to the parent component using the provided onConfirm prop
    onConfirm(selectedSite.value);
  } else {
    // Provide feedback to the user that they need to select a site
    alert('Please select a site before confirming.');
  }
};
  
  const closeModal = () => {
    // Optionally, you can close the modal when clicking outside of it
    // You can add this functionality if needed
  };
  
  </script>
  
  <style scoped lang="scss">
  /* Add styling for the modal and its content */
  .modal {
  /* Styles for the modal overlay */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  /* Styles for the modal content */
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
    max-width: 80%;
}

.site-list {
  margin: 0 auto;
  width: 100%; /* Adjust the width as needed */
}

/* Highlight selected site */
.selected-site {
  background-color: #754747; /* Change to your desired highlight color */
  border: 2px solid #d834db; /* Change to your desired border color */
}
  
  </style>
  