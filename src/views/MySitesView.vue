<template>
    <div class="mysites-container rb">
      <div v-for="site in sites" :key="site.id" class="mysite-card flex flex-col m-1 border-2 border-gray-200" @click="selectSite(site)">
        <h2 class="text-slate-500">{{ site.name }}</h2>
        <!-- Display plants when a site is selected -->
        <div class="myplant-card " v-if="selectedSite && selectedSite.id === site.id">
          <h3>Plants:</h3>
          <div class="myplant relative" v-for="plant in plants" :key="plant.id">
            <!-- Only display plants that belong to the selected site -->
            <template v-if="plant.siteId === site.id">
            <div class="plant-details absolute  ">
                <p>{{ plant.name }}</p>
                <img class="img" :src="plant.imgUrl" alt="">
            </div>
              
              <!-- Display other plant data... -->
            </template>
          </div>
        </div>
      </div>
    </div>
</template>
  
  

<script setup>
import { ref, onMounted} from 'vue';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase.js';

const sites = ref([]);
const plants = ref([]);
const selectedSite = ref(null);

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
.mysites-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    background-color: $white;
    width: calc(100vw - 2rem);
    .mysite-card {
        width: 200px;
        height: 200px;
    }
    .myplant-card{
        width: 200px;
        height: 200px;
    }
}
.img {
    width: 250px;
    height: 130px;
    filter: opacity(0.6);
    &:hover{
        filter: opacity(1);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;                        
        scale: 1.1 ;
        transition: all 0.5s ease-in-out; 
    }
}

</style>