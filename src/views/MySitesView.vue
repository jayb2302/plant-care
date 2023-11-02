<template>
  <div class="md:flex  p-3 h-[80vh] ">
    <!-- Sidebar for sites -->
    <div class="sitesSidebar lg:w-2/12 p-2 border-r absolute right-0 top-48 hidden md:block">
        <div class="flex flex-col relative z-50 lg:z-0  flex-wrap ">
          <div
            v-for="site in sites"
            :key="site.id"
            @click="selectSite(site)"
            class="siteList cursor-pointer w-full  p-2 border-b-2 border-neutral-200 rounded-md  flex flex-grow justify-between "
            :class="{ 'bg-gray-200': selectedSite && selectedSite.id === site.id }"
          >
            <h2 class=" pl-3  text-lg">{{ site.name }}</h2>
          <button  @click="confirmSiteDelete(site)" class="trash">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="30" viewBox="0 0 32 32">
              <path d="M 11 2 L 11 4 L 21 4 L 21 2 L 11 2 z M 4 6 L 4 8 L 28 8 L 28 6 L 4 6 z M 7.9921875 9.875 L 6.0078125 10.125 C 6.0078125 10.125 7 18.074074 7 27 L 7 28 L 25 28 L 25 27 C 25 18.074074 25.992188 10.125 25.992188 10.125 L 24.007812 9.875 C 24.007812 9.875 23.120303 17.398914 23.042969 26 L 8.9570312 26 C 8.8796974 17.398914 7.9921875 9.875 7.9921875 9.875 z M 12.986328 10.835938 L 11.013672 11.164062 C 11.013672 11.164062 12 17.111111 12 23 L 14 23 C 14 16.888889 12.986328 10.835936 12.986328 10.835938 z M 19.013672 10.835938 C 19.013672 10.835938 18 16.888889 18 23 L 20 23 C 20 17.111111 20.986328 11.164064 20.986328 11.164062 L 19.013672 10.835938 z"></path>
            </svg>
          </button>
          </div>
        </div>
     
    </div>

    <!-- Toggle button for the sidebar (shown on small screens) -->
    <div class="md:hidden  w-full flex justify-end p-1 border-r">
      <button @click="toggleSidebar" class="z-30 cursor-pointer">
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
    <div v-if="selectedSite"
      v-motion="'fade'"
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1 }"
      :leave="{ opacity: 0 }"  class="plantsList-wrapper md:z-0 relative md:w-10/12 bottom-10 pb-3  md:top-5 flex flex-col  p-1">
        <h2 class="plantsInSite text-2xl mb-5  pl-5">Plants in {{ selectedSite.name }}</h2>
      <div  class="plantsList-content  flex flex-col h-[70vh] overflow-y-auto mx-5" v-if="selectedSite">
        <div class="myplant-card flex m-1 flex-wrap  py-5  gap-2 justify-center">
          <div class="myplant relative h-auto p-2 w-70  md:w-60" v-for="(plant) in filteredPlants" :key="plant.id">
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
              <div class="relative flex flex-col  md:justify-center " v-if="plant.siteId === selectedSite.id">
                <div class="plant-details">
                
                  <div class="flex justify-between" >
                  <h2 class="text-1xl pl-1 capitalize truncate z-10 top-5"><strong>{{ plant.plant_nickname }}</strong></h2>
                  <button class="trash relative  bottom-0 left-0 " @click="confirmDelete(plant)">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="30" viewBox="0 0 32 32">
                      <path d="M 11 2 L 11 4 L 21 4 L 21 2 L 11 2 z M 4 6 L 4 8 L 28 8 L 28 6 L 4 6 z M 7.9921875 9.875 L 6.0078125 10.125 C 6.0078125 10.125 7 18.074074 7 27 L 7 28 L 25 28 L 25 27 C 25 18.074074 25.992188 10.125 25.992188 10.125 L 24.007812 9.875 C 24.007812 9.875 23.120303 17.398914 23.042969 26 L 8.9570312 26 C 8.8796974 17.398914 7.9921875 9.875 7.9921875 9.875 z M 12.986328 10.835938 L 11.013672 11.164062 C 11.013672 11.164062 12 17.111111 12 23 L 14 23 C 14 16.888889 12.986328 10.835936 12.986328 10.835938 z M 19.013672 10.835938 C 19.013672 10.835938 18 16.888889 18 23 L 20 23 C 20 17.111111 20.986328 11.164064 20.986328 11.164062 L 19.013672 10.835938 z"></path>
                    </svg>
                  </button>
                  </div>
                  <img class="img mt-2 mb-2 p-1" :src="plant.image_url" alt="">
                  <div class="text-background w-full absolute top-24 mt-9 ">
                  
                  <p class="truncate pl-2 " > {{ plant.common_name }}</p>
                  </div>
                </div>
                <div class="plant-details-bottom capitalize ">
                  <strong>Water Every</strong>
                    <p class="pl-2"> {{ plant.water_frequency }}</p>
                  <strong> Light  </strong>
                    <p class="pl-2"> {{ plant.light_conditions }}</p>
                  <strong>Care Level</strong>
                    <p class="pl-2"> {{ plant.care_level }}</p>
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
    <transition
      v-if="isSiteDeleteConfirmationOpen"
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
      <teleport to="body" v-if="isSiteDeleteConfirmationOpen">
        <div class="modal delete-confirmation-modal">
          <div class="modal-content flex flex-col items-center">
            <p class="pb-5 text-2xl">Are you sure you want to delete</p>
            <p class="siteName">{{ selectedSiteToDelete.name }}</p>
            <p class="pb-5"> from your sites?</p>
            <div class="confirmationButton-wrapper text-1xl flex gap-2">
              <button class="buttonadmin __yes w-40" @click="deleteSiteConfirmation">
                <div class="buttonadmin__horizontal"></div>
                <div class="buttonadmin__vertical"></div>
                Yes
              </button>
              <button class="buttonadmin __no w-40" @click="cancelSiteDelete">
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
import { ref, onMounted, computed } from 'vue';
import { db } from '../firebase.js';
import { sites } from '../modules/sites.js';
import { plants } from '../modules/plants.js';
import { collection, getDocs, doc, deleteDoc, query, where, onSnapshot } from 'firebase/firestore';
import { getCurrentUser } from '../auth';


const selectedSite = ref(null);
const user = ref(null);
const selectedPlantToDelete = ref(null);
const isDeleteConfirmationOpen = ref(false);
const selectedSiteToDelete = ref(null);
const isSiteDeleteConfirmationOpen = ref(false);

// Use Firebase Auth to ensure the user is authenticated before initializing

const loadSites = async () => {
  user.value = await getCurrentUser(); // Set the current user

  if (user.value) {
    const sitesCollection = collection(db, 'sites');
    const sitesQuery = query(sitesCollection, where('userId', '==', user.value.uid));
    onSnapshot(sitesQuery, (snapshot) => {
      sites.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });
  }
};


const loadPlants = async () => {
  // Fetch initial plants
  if (user.value) {
    const plantsCollection = collection(db, 'plants');
    const plantsQuery = query(plantsCollection, where('userId', '==', user.value.uid));
    const initialPlantsSnapshot = await getDocs(plantsQuery);
    plants.value = initialPlantsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  // Listen for real-time updates to the plants collection
  if (user.value) {
    const plantsCollection = collection(db, 'plants');
    const plantsQuery = query(plantsCollection, where('userId', '==', user.value.uid));

    // This will update the local plants array whenever there's a change in the Firestore collection.
    onSnapshot(plantsQuery, (snapshot) => {
      plants.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });
  }
};

const selectSite = async (site) => {
  selectedSite.value = site;

  if (site) {
    const plantsCollection = collection(db, 'plants');
    const plantsQuery = query(plantsCollection, where('siteId', '==', site.id));
    const plantsSnapshot = await getDocs(plantsQuery);
    plants.value = plantsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
};

const filteredPlants = computed(() => {
  if (!selectedSite.value) {
    return plants.value;
  }
  return plants.value.filter((plant) => plant.siteId === selectedSite.value.id);

});

const confirmSiteDelete = (site) => {
  selectedSiteToDelete.value = site;
  isSiteDeleteConfirmationOpen.value = true;
};

const cancelSiteDelete = () => {
  selectedSiteToDelete.value = null;
  isSiteDeleteConfirmationOpen.value = false;
};

const deleteSiteConfirmation = async () => {
  if (selectedSiteToDelete.value) {
    try {
      const siteRef = collection(db, 'sites');
      await deleteDoc(doc(siteRef, selectedSiteToDelete.value.id));
      selectedSiteToDelete.value = null;
      isSiteDeleteConfirmationOpen.value = false;
    } catch (error) {
      console.error('Error deleting site: ', error);
    }
  }
};


const toggleSidebar = () => {
  const sidebar = document.querySelector('.sitesSidebar');
  sidebar.classList.toggle('hidden');
};



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
  loadSites();
  loadPlants();
});
</script>

<style lang="scss" scoped>
.siteList {
  background-color: $lightgray;
  button {
    display: none;
    
  } 
  &:hover{
    
      button {
        display: block;
      }
    }
  @media screen and (max-width: 768px) {
    
    button {
      display: block;
    }
  }
}
.modal {
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
  
  border: 1px solid rgba(150, 150, 150, 0.284);
  border-radius: 10px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;       
     .plantsInSite{
        box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
      
      }
  .plantsList-content {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    
    .myplant-card {
      background: #ada9962f;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to bottom, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to top, #eaeaeaa2, #DBDBDB, #F2F2F2, #c3c1ba6f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
     
      .myplant {
        background-color: $white;
        border-radius: 10px;
        box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, ;   
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      .plant-details-bottom{
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      }   
     
      h2 {
        font-family: $sub-heading-font;
        letter-spacing: 1px;
        
        
      }
      
     }
   }
  }
}



</style>