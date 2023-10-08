<template>
  <div class="main bg-slate-100 w-full h-screen" v-if="isLoggedIn">
    <h1>Admin Home</h1>
   
    <button id="btn-out" @click="handleSignOut">
      <p>Sign out</p>
    </button>
    
    <!-- Two-column layout -->
    <div class="dashboard flex">
      <!-- Left column -->
      <div class="left-column">
        <!-- Button to create a new site -->
        <button @click="navigateToCreateSite">Create a Site</button>

        <!-- List of user sites -->
        <div class="sites-list">
          <h2 class="text-2xl text-center">Sites</h2>
          <ul>
            <li v-for="site in sites" :key="site.id">
              <router-link :to="{ name: 'siteDetail', params: { id: site.id } }">
                {{ site.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Right column -->
      <div class="right-column">
        <div class="plants-list">
          <h2 class="text-2xl text-center">My Plants</h2>
          <!-- Display user's plants here -->
        </div>
      </div>
    </div>
  </div>

   <!-- Site Selection Modal -->
   <SiteSelectionModal v-if="showModal" @closeModal="showModal = false" :onConfirm="handleSiteSelection" />


  <div v-else class="w-screen flex-col justify-center">
    <p class="p-tag text-center">Please log in to access this page.</p>
    <button id="btn-in" class="w-screen" @click="redirectToSignIn">Log In</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { useSites } from '../modules/site.js';
import router from '../router/index.js';
import SiteSelectionModal from '../components/SiteSelectionModal.vue'; // Adjust the path

const showModal = ref(false); // To control the visibility of the modal

const navigateToCreateSite = () => {
  showModal.value = true; // Show the modal when creating a new site
};

const { sites } = useSites();

const redirectToSignIn = () => {
  router.push('/signin');
};

let isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });
});

const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log('Signed out successfully');
      isLoggedIn.value = false;
    })
    .catch((error) => {
      console.log(error.code);
    });
};

const handleSiteSelection = (selectedSite) => {
  // Handle the selected site in the parent component
  console.log("Selected Site:", selectedSite);

  // Close the modal if needed
  showModal.value = false;
};

</script>

<style lang="scss" scoped>

/* Your styling for columns goes here */
.dashboard {
  display: flex;
}

.left-column {
  /* Styling for the left column */
  margin: 0 auto;
}

.right-column {
  /* Styling for the right column */
  margin: 0 auto;
}
</style>
