<template>
  <div class="admin-home-container min-h-full">
    <header class="shadow">
      <div class="belowheader mx-auto flex justify-between max-w-7xl px-3 py-6 sm:px-6 lg:px-8">
        <h1 class="adminh1">My Plant Home</h1>
        <div class="btn-wrapper gap-10 flex">
          <button class="buttonadmin" @click="showAddPlantModal = true">
            <img class="leaf" src="../assets/img/twoleaves.svg" style="width: 40px; height: 40px;" alt="Two leaf icon" />
            Add Plant
            <div class="buttonadmin__horizontal"></div>
            <div class="buttonadmin__vertical"></div>
          </button>
          <button class="buttonadmin" @click="showAddSiteModal = true">
            Add Site
            <div class="buttonadmin__horizontal"></div>
            <div class="buttonadmin__vertical"></div>
          </button>
        </div>
      </div>

      <div id="modal-container">
        <Teleport to="body">
          <div class="modal-background dark:bg-slate-500">
            <transition
              v-motion
              :initial="{
                opacity: 0,
                y: 0,
              }"
              :variants="{ custom: { scale: 2 } }"
              :enter="{
                opacity: 1,
                y: 0,
              }"
            >
              <AddPlantModal @close="handleModalClose" class="two" v-if="showAddPlantModal" />
            </transition>
          </div>
        </Teleport>

        <Teleport to="body">
          <div class="modal-background">
            <transition
              v-motion
              :initial="{
                opacity: 0,
                y: 0,
              }"
              :variants="{ custom: { scale: 2 } }"
              :enter="{
                opacity: 1,
                y: 0,
              }"
            >
              <AddSiteModal :onConfirm="handleSiteSelection" @close="handleModalClose" class="two bg-slate-400" v-if="showAddSiteModal" />
            </transition>
          </div>
        </Teleport>
      </div>
    </header>

    <main class="bg-white shadow mt-3 rb">
       <!-- Upcoming Tasks for Each Plant -->
       <div v-for="(plant, index) in plants" :key="index">
      <p>
        <strong>{{ plant.common_name }}</strong>
        <span v-if="nextWateringDates[index] !== null">
          {{ formatDate(nextWateringDates[index]) }}
        </span>
        <span v-else>
          No watering schedule available.
        </span>
      </p>
    </div>


      <!-- Upcoming Tasks in the Next Week -->
      <div>
        <h2>Upcoming Tasks in the Next Week</h2>
        <ul>
          <li v-for="(task, index) in upcomingTasksInWeek" :key="index">
            <p>
              <strong>{{ task.name }}</strong> - Water in {{ task.days }} days on {{ task.date }}
            </p>
          </li>
        </ul>
        <p v-if="upcomingTasksInWeek.length === 0">No upcoming watering tasks in the next week.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { calculateNextWateringDate, useNextWateringDates } from '../modules/nextWatering';
import AddPlantModal from '@/components/AddPlantModal.vue';
import AddSiteModal from '@/components/AddSiteModal.vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { plants, getPlantsData } from '../modules/plants';

const showAddPlantModal = ref(false);
const showAddSiteModal = ref(false);
const selectedSite = ref(null);
const sites = ref([]);
const { nextWateringDates } = useNextWateringDates();
const upcomingTasksInWeek = ref([]);

const fetchPlantsAndCalculateNextWateringDates = async () => {
  await getPlantsData();
  nextWateringDates.value = plants.value.map((plant) => {
    return calculateNextWateringDate(plant.last_watered, plant.water_frequency);
  });

  const currentDate = new Date();
  const oneWeekLater = new Date(currentDate);
  oneWeekLater.setDate(currentDate.getDate() + 7);

  upcomingTasksInWeek.value = plants.value
    .map((plant, index) => ({
      name: plant.name,
      days: nextWateringDates[index],
      date: new Date(plant.last_watered),
    }))
    .filter((task) => {
      if (!isNaN(task.days)) {
        return task.date > currentDate && task.date <= oneWeekLater;
      }
    });
};


const fetchPlantsForSelectedSite = async (siteId) => {
  const plantsCollection = collection(db, 'plants'); 
  // You can use the 'where' function here to filter based on the selected site.
  const plantsQuery = query(plantsCollection, where('siteId', '==', siteId));
  const plantsSnapshot = await getDocs(plantsQuery);
  plants.value = plantsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const selectSite = (site) => {
  selectedSite.value = site;
  fetchPlantsForSelectedSite(site.id);
};
console.log(selectSite);

onMounted(() => {
  fetchPlantsAndCalculateNextWateringDates();
});
const formatDate = (date) => {
  if (date instanceof Date && !isNaN(date)) {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  } else {
    return 'Invalid Date';
  }
};
const handleSiteSelection = (site) => {
  console.log(site);
};

const handleModalClose = () => {
  showAddPlantModal.value = false;
  showAddSiteModal.value = false;
};
</script>




<style lang="scss">

nav {
  visibility: hidden;
}
.admin-home-container {
 
  height: 100vh;
  width: 95vw;
  
}
 
header {

  .belowheader {
    height: 10vh;
    .adminh1 {
    font-size: 3em;
    font-weight: 800;
    text-shadow: 2px 3px 3px rgba(0,0,0,0.3), 
       0px -7px 10px rgba(255,255,255,0.3,), -4px 2px 3px rgba(255,255,255,0.3);
    left: 5%;
    top: 50;
    transform: translate(-5%, -50%);
    font-family: $heading-font;
    color: $subheading-text;
    }
  }
}

.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  

  &__input {
    font-family: inherit;
    font-size: inherit;
    border: none;
    color: $black;
    padding: 0.8rem 1.4rem;
    border-radius: 30px;
    animation:  0.8s forwards;
    font-size: 1.2rem;
    
    
    

    &:hover, &:focus {
      box-shadow: 0 0 1em #00000013;
      background-image: url(../components/icons/lotusFlower.svg);
      background-size: 50px 40px;
      background-position-x: 90% ;
      background-position-y: 50% ;
      background-repeat: no-repeat;
      transition:  ease-in-out 0.5s;
      transform: background-image scale(1.4) rotate(30deg);
      
      
    }

    &:focus {
      outline: none;
      background-color: #f0eeee;
      
    }

    &::-webkit-input-placeholder {
      font-weight: 100;
      color: $black;
     
    }

    &:focus + .search__button {
      background-color: none;
    }
  }

  &__button {
    border: none;
    background-color: #f4f2f2;
    margin-top: 0.1em;

    &:hover {
      cursor: pointer;
    }
  }

  &__icon {
    height: 1.3em;
    width: 1.3em;
    mix-blend-mode: darken;  
    
  }
}

.selected {
  background-color: #007BFF; /* Set the background color */
  color: #FFF; /* Set the text color */
  font-weight: bold; /* Make the text bold, if desired */
  /* Add any other styling you prefer for the selected site */
}



</style>

