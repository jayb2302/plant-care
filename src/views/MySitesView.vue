<template>
  <div class="lg:flex  w-full p-3    h-[70vh] ">
    <!-- Sidebar for sites -->
    <div class="sitesSidebar w-full  p-2 border-r absolute hidden md:block">
      <div class="   ">
        <div class="flex flex-col w-full flex-wrap ">
          <div
            v-for="site in sites"
            :key="site.id"
            @click="selectSite(site)"
            class="cursor-pointer z-10  w-4/12 rb p-2 mb-2 flex flex-grow "
            :class="{ 'bg-gray-200': selectedSite && selectedSite.id === site.id }"
          >
            <h2 class="text-lg">{{ site.name }}</h2>
          <button  @click="deleteSiteConfirmation(site)" class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 32 32">
              <path d="M 11 2 L 11 4 L 21 4 L 21 2 L 11 2 z M 4 6 L 4 8 L 28 8 L 28 6 L 4 6 z M 7.9921875 9.875 L 6.0078125 10.125 C 6.0078125 10.125 7 18.074074 7 27 L 7 28 L 25 28 L 25 27 C 25 18.074074 25.992188 10.125 25.992188 10.125 L 24.007812 9.875 C 24.007812 9.875 23.120303 17.398914 23.042969 26 L 8.9570312 26 C 8.8796974 17.398914 7.9921875 9.875 7.9921875 9.875 z M 12.986328 10.835938 L 11.013672 11.164062 C 11.013672 11.164062 12 17.111111 12 23 L 14 23 C 14 16.888889 12.986328 10.835936 12.986328 10.835938 z M 19.013672 10.835938 C 19.013672 10.835938 18 16.888889 18 23 L 20 23 C 20 17.111111 20.986328 11.164064 20.986328 11.164062 L 19.013672 10.835938 z"></path>
            </svg>
          </button>
    </div>
  </div>
  


    </div>
    </div>

    <!-- Toggle button for the sidebar (shown on small screens) -->

  <div class="md:hidden w-2/12 p-1 border-r">
      <button @click="toggleSidebar" class="z-10 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>


    <!-- Plants for selected site -->
    
    <div   v-if="selectedSite"
      v-motion="'fade'"
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1 }"
      :leave="{ opacity: 0 }"  class="plantsList-wrapper absolute lg:w-9/12 bottom-10 lg:right-0 flex flex-col sm:w-full p-1">
     
      <div  class="plantsList-content flex flex-col h-[60vh] overflow-y-auto" v-if="selectedSite">
        <h2 class="text-2xl mb-5 pl-5">Plants in {{ selectedSite.name }}</h2>
        <div class="myplant-card flex m-2 flex-wrap gap-2 justify-center">
          <div class="myplant relative p-2 w-full md:w-1/2 lg:w-1/4" v-for="(plant) in plants" :key="plant.id">
            <div v-motion
              :initial="{
                opacity: 0,
                y: 100,
              }"
              :enter="{
                opacity: 1,
                
                y: 0,
              }"
            >
              <div class="relative flex justify-center " v-if="plant.siteId === selectedSite.id">
                <div class="plant-details overflow-hidden  p-2">
                  <h2 class="text-1xl pl-1 capitalize truncate z-10 top-5"><strong>{{ plant.common_name }}</strong></h2>

                  <img class="img mt-2 mb-2" :src="plant.image_url" alt="">
                  <button class="  top-0 right-0" @click="confirmDelete(plant)">
                   <strong>delete</strong> 
                  </button>
                </div>
                <div class="plant-details capitalize pl-1">
                <strong>Water Every</strong>
                  <p> {{ plant.water_frequency }}</p>
                <strong> Light  </strong>
                  <p> {{ plant.light_conditions }}</p>
                <strong>Care Level</strong>
                  <p> {{ plant.care_level }}</p>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Delete Confirmation Modal -->
        
       
      </div>
    </div>
    
     <transition
          v-if="isDeleteConfirmationOpen"
          v-motion
          :initial="{
            backgroundColor: '$lightgray',
            opacity: 0,
            y: 0,
          }"
          :variants="{ custom: { scale: 1 } }"
          :enter="{
            backgroundColor: '$input',
            duration: 0.5,
            opacity: 1,
            y: 0,
          }"
        >
          <teleport to="body" v-if="isDeleteConfirmationOpen">
              <div class="modal  delete-confirmation-modal">
                <div class="modal-content flex flex-col items-center">
                  <p class="pb-5 text-2xl">Are you sure you want to delete</p>
                  <img class="w-40 pt-3 pb-3" :src="selectedPlantToDelete.image_url" alt="">
                  <p class="plantName">{{ selectedPlantToDelete.common_name }}</p>
                  <p class="pb-5"> from your {{ selectedSite.name }}?</p>
                  <div class="confirmationButton-wrapper text-1xl flex gap-2">
                    <button class="buttonadmin __yes w-40" @click="deletePlant">
                      <div class="buttonadmin__horizontal"></div>
                      <div class="buttonadmin__vertical"></div>
                        Yes
                    </button>
                    <button class="buttonadmin __no w-40" @click="cancelDelete">
                      <div class="buttonadmin__horizontal"></div>
                      <div class="buttonadmin__vertical"></div>
                        No
                    </button>
                  </div>
                </div>
              </div>
          </teleport>
        </transition>
  </div>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import { db } from '../firebase.js';
import { sites,  deleteSite } from '../modules/sites.js'; // Import the functions you need from sites.js
import { plants } from '../modules/plants.js';
import { collection, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore';


const selectedSite = ref(null);

const deleteSiteConfirmation = (site) => {
  // Call the deleteSite function from your imported sites module
  deleteSite(site);
};




const toggleSidebar = () => {
  const sidebar = document.querySelector('.sitesSidebar');
  sidebar.classList.toggle('hidden');
};
const selectSite = async (site) => {
  selectedSite.value = site;
  // Load associated plants for the selected site without triggering deletions
  const plantsCollection = collection(db, 'plants');
  const plantsQuery = query(plantsCollection, where('siteId', '==', site.id));
  const plantsSnapshot = await getDocs(plantsQuery);
  plants.value = plantsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const selectedPlantToDelete = ref(null);
const isDeleteConfirmationOpen = ref(false);

const confirmDelete = (plant) => {
  selectedPlantToDelete.value = plant;
  isDeleteConfirmationOpen.value = true;
};

const cancelDelete = () => {
  selectedPlantToDelete.value = null;
  isDeleteConfirmationOpen.value = false;
};

const deletePlant = async () => {
  if (selectedPlantToDelete.value) {
    try {
      const plantRef = collection(db, 'plants');
      await deleteDoc(doc(plantRef, selectedPlantToDelete.value.id));
      selectedPlantToDelete.value = null;
      isDeleteConfirmationOpen.value = false;
    } catch (error) {
      console.error('Error deleting plant: ', error);
    }
  }
};




onMounted(async () => {
  const sitesCollection = collection(db, 'sites');
  const sitesQuery = query(sitesCollection);
  const sitesSnapshot = await getDocs(sitesQuery);
  sites.value = sitesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

});





</script>




<style lang="scss" scoped>


.modal {
  padding: 10em 20em;
  
 .modal-content {
  background-color: $lightgray;
  }
  
  .plantName {
    font-weight: bold;
    text-transform: capitalize;
    text-decoration: underline;
  }
 }

.img {
    width: 250px;
    height: 130px;
    filter: opacity(0.6);
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;        overflow: hidden;

    &:hover{
        filter: opacity(1);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;                        
        scale: 1.1 ;
        transition: all 0.5s ease-in-out; 
    }
    @media (max-width: 768px) {
      filter: opacity(1);
    }
}

.plantsList-wrapper {
  font-family: $title-font;
  background-image:
    radial-gradient(at 86% 10%, hsla(28,11%,71%,1) 0px, transparent 50%),
    radial-gradient(at 92% 92%, hsla(60,0%,34%,1) 0px, transparent 50%),
    radial-gradient(at 59% 31%, hsla(0,22%,54%,1) 0px, transparent 50%),
    radial-gradient(at 3% 96%, hsla(197,8%,83%,1) 0px, transparent 50%),
    radial-gradient(at 60% 71%, hsla(7,37%,74%,1) 0px, transparent 50%),
    radial-gradient(at 27% 65%, hsla(60,0%,24%,1) 0px, transparent 50%),
    radial-gradient(at 4% 12%, hsla(28,11%,71%,1) 0px, transparent 50%);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(150, 150, 150, 0.284);
        border-radius: 10px;
        box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;       
    
  .plantsList-content {
    
      
   .myplant-card {
    
    
     .myplant {
       background-color: $white;
       border-radius: 10px;
       box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, ;       
     
      h2 {
        font-family: $sub-heading-font;
        letter-spacing: 1px;
        
      }
     }
   }
  }
}

</style>