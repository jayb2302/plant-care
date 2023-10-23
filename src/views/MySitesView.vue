<template>
  <div class="flex  w-screen my-5">
    <!-- Sidebar for sites -->
    <div class="sitesSidebar w-2/12 p-4 border-r">
      <h2 class="text-xl font-bold mb-4">My Sites</h2>
      <div 
       v-for="site in sites" :key="site.id" @click="selectSite(site)" class="cursor-pointer pl-4 mb-2">
        <h3 class="text-lg">{{ site.name }}</h3>
      </div>
    </div>
    <!-- Plants for selected site -->
    <div class="plantsList-wrapper  flex flex-col p-1">
      <div class="plantsList-content  mt-3" v-if="selectedSite">
        <h4 class="text-2xl mb-5 ">Plants in {{ selectedSite.name }}</h4>
        <div class="myplant-card  flex gap-5 item-center flex-wrap overflow-y-auto" style="">
          <div class="myplant  w-1/4 p-2" v-for="plant in plants" :key="plant.id">
            <div v-motion
                  :initial="{
                    opacity: 0,
                    y: 100,
                    
                  }"
                  :enter="{
                    opacity: 1,
                    y: 0,
            }">
          
              <div v-if="plant.siteId === selectedSite.id">
                <h2 class="text-1xl pl-1 capitalize"><strong>{{ plant.common_name }}</strong></h2>
                <div class="plant-details p-2 ">
                  <img class="img mt-2 mb-2 " :src="plant.image_url" alt="">
                </div>
                <div class="plant-details capitalize pl-1">
                  <p>Water Frequency: {{ plant.water_frequency }}</p>
                  <p>Light Conditions: {{ plant.light_conditions }}</p>
                  <p>Care Level: {{ plant.care_level }}</p>
                  <button class="delete-btn" @click="confirmDelete(plant)">Delete</button>
                </div>
                </div>
              </div> 
          </div>
        </div>
        <!-- Delete Confirmation Modal -->
        <teleport to="body" v-if="isDeleteConfirmationOpen">
          <transition 
            v-motion
            :initial="{
              backgroundColor: '$lightgray',
              opacity: 0,
              y: 0,
            }"
            :variants="{ custom: { scale: 2 } }"
            :enter="{
              backgroundColor: '$input',
              opacity: 1,
              y: 0,

            }"  
          > 
          <div class="modal  delete-confirmation-modal">
            <div class="modal-content  flex flex-col   items-center">
              <p class=" pb-5 text-2xl">Are you sure you want to delete</p> 
              <img class="w-40 pt-3 pb-3" :src="selectedPlantToDelete.image_url" alt="">
              <p class="plantName">{{ selectedPlantToDelete.common_name }}</p> 
              <p class="pb-5"> from your {{ selectedSite.name }}?</p> 
              <div class="confirmationButton-wrapper text-1xl flex gap-2">
                <button class="button w-40" @click="deletePlant">Yes</button>
                <button class="button w-40" @click="cancelDelete">No</button>
              </div>
            </div>
          </div>
          </transition>
        </teleport>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.js';

const sites = ref([]);
const plants = ref([]);
const selectedSite = ref(null);

// Other setup logic and imports

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

const selectSite = async (site) => {
  selectedSite.value = site;
  const plantsCollection = collection(db, 'plants');
  const plantsQuery = query(plantsCollection, where('siteId', '==', site.id));
  const plantsSnapshot = await getDocs(plantsQuery);
  plants.value = plantsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};


</script>




<style lang="scss" scoped>


.modal {
  padding: 10em 30em;
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
}

.plantsList-wrapper {
  font-family: $title-font;
  .plantsList-content {
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
        padding: 2rem 0.5rem;
      
   .myplant-card {
    
    padding: 2em 1.4em;
     .myplant {
       background-color: $white;
       border-radius: 10px;
       box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, ;       
      width: clamp(calc(25vw - 6rem), 10vw, 30vw);
      h2 {
        font-family: $sub-heading-font;
        letter-spacing: 1px;
        
      }
     }
   }
  }
}

</style>