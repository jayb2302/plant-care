
<template>
  <div class="main bg-slate-100 w-full h-screen" v-if="isLoggedIn">
    <h1>Admin Home</h1>
   
    <button id="btn-out" @click="handleSignOut">
      <p>Sign out</p>
    </button>
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
    <div class="wrapper flex">
      <div class="wrapper flex">
      <NewPlantForm @image-uploaded="handleImageUploaded" />
      
      <div class="plants-list flex flex-col w-1/2">
        <h2 class="text-2xl text-center">My Plants</h2>
        <div class="flex flex-col" v-for="myplant in myplants" :key="myplant.id">
          <img :src="myplant.imgURL" alt="plant image">
          <h3>{{ myplant.name }}</h3>
          <h3>{{ myplant.location }}</h3>
          <h3>{{ myplant.description }}</h3>
          <button class="delete-btn" @click="fbDeleteSinglePlant(myplant.id)">Delete Plant</button>
        </div>      
        </div>
    </div>
    

    
      
    </div>
    
  </div>
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
import { db } from '../firebase.js';
import { useSites } from '../modules/site.js';
import { myplants, getPlantsData, addPlant, deletePlant } from '../modules/myplant.js';

const { sites } = useSites();

const redirectToSignIn = () => {
  router.push('/signin');
};

let newPlantImgURL = ref('https://placehold.co/600x400');
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

const handleImageUploaded = (imgURL) => {
  newPlantImgURL.value = imgURL;
};

</script>


<style lang="scss" scoped>
.bg {
    width: 100%;
    border: 1px solid red;
}

.delete-btn {
    background-color: red;
    color: white;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
}
</style>
```
