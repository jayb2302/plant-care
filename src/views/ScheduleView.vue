<template>
  <div class="schedule min-h-full">
    <header class="shadow">
      <div class="belowheader mx-auto flex justify-between max-w-7xl px-1 py-6 sm:px-6 lg:px-2">
        <h1 class="adminh1">My Schedule</h1>
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
   
    <main class="shadow mt-3 flex w-12/12">
      <div class="task-container w-4/12 flex flex-col">
        <div class="plant-tasks__past">
          <h2 class="text-2lx">Plants Past Watering</h2>
          <ul>
            <li v-for="(plant, index) in pastWateringPlants" :key="index">
              <strong>{{ plant.common_name }}</strong> - {{ formatDate(plant.last_watered) }}
            </li>
          </ul>
        </div>
        <!-- Column 2: Plants to Water Today -->
        <div class="plant-tasks__past">
          <h2 class="h2 text-2lx">Plants to Water Today</h2>
          <ul>
            <li v-for="(plant, index) in plantsToWaterToday" :key="index">
              <strong>{{ plant.common_name }}</strong>
            </li>
          </ul>
        </div>
           <!-- Column 3: Plants to Water Tomorrow -->
        <div class="plant-tasks__past">
          <h2 class="text-2lx">Plants to Water Tomorrow</h2>
          <ul>
            <li v-for="(plant, index) in plantsToWaterTomorrow" :key="index">
              <strong>{{ plant.common_name }}</strong>
            </li>
          </ul>
        </div>
      </div>
     
        <!-- Column 4: Plant Care Tips -->
        
      <div class="tips-container">
        <button @click="toggleTips" class="expand-button fixed right-10 bottom-10" :class="{ 'expanded': showTips }">
          {{ showTips ? 'Hide Tips' : 'Plant Tips' }}
        </button>
        <transition name="expand-fade" mode="out-in">
          <div v-if="showTips" key="tips" class="plant-tips absolute right-10 bottom-20">
            <h2 class="text-2lx">Plant Care Tips</h2>
            <ul>
              <li v-for="(tip, index) in plantCareTips" :key="index">{{ tip }}</li>
            </ul>
          </div>
        </transition>
      </div>
  
        <!-- Column 5: Plants Countdown -->
        <div class="plants-to-water-container">
          <h2 class="text-2xl">Plants Countdown</h2>
          <ul class="column-card flex flex-col">
            <li class="flex flex-col" v-for="(plant, index) in plants" :key="index">
              <strong>{{ plant.common_name }}</strong> - Water in {{ getDaysUntilWatering(plant) }} days
              <button @click="markWateringAsDone(plant)">Mark as Done</button>
            </li>
          </ul>
        </div>
     
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, } from 'vue';
import { calculateNextWateringDate, useNextWateringDates } from '../modules/nextWatering';
import AddPlantModal from '@/components/AddPlantModal.vue';
import AddSiteModal from '@/components/AddSiteModal.vue';

import { getFirestore,  doc, updateDoc } from 'firebase/firestore';
import { plants, getPlantsData } from '../modules/plants';
const db = getFirestore();

const showAddPlantModal = ref(false);
const showAddSiteModal = ref(false);
const pastWateringPlants = ref([]);
const plantsToWaterToday = ref([]);
const plantsToWaterTomorrow = ref([]);
const plantCareTips = ref([]);

const fetchPlantsAndCalculateNextWateringDates = async () => {
  await getPlantsData();

  // Calculate next watering dates and categorize plants
  const currentDate = new Date();
  nextWateringDates.value = plants.value.map((plant) => {
    return calculateNextWateringDate(plant.last_watered, plant.water_frequency);
  });

  for (let i = 0; i < plants.value.length; i++) {
    const plant = plants.value[i];
    const nextWateringDate = nextWateringDates.value[i].date;
    if (nextWateringDate < currentDate) {
      pastWateringPlants.value.push(plant);
    } else if (nextWateringDate.toDateString() === currentDate.toDateString()) {
      plantsToWaterToday.value.push(plant);
    } else if (nextWateringDate.toDateString() === new Date(currentDate.getTime() + 24 * 60 * 60 * 1000).toDateString()) {
      plantsToWaterTomorrow.value.push(plant);
    }
  }

  // Populate plantCareTips
  plantCareTips.value = [
    "Water your plants on a consistent schedule.",
    "Provide adequate sunlight for each plant's needs.",
    "Fertilize your plants regularly but not excessively.",
    "Prune and trim your plants when necessary.",
  ];
};

const { nextWateringDates } = useNextWateringDates();

// Function to calculate days until watering for a plant
const getDaysUntilWatering = (plant) => {
  const nextWateringDate = calculateNextWateringDate(plant.last_watered, plant.water_frequency).date;
  const currentDate = new Date();
  const timeDiff = nextWateringDate - currentDate;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
};


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


const handleModalClose = () => {
  showAddPlantModal.value = false;
  showAddSiteModal.value = false;
};

const updatePlantData = async () => {
  await getPlantsData();
  pastWateringPlants.value = [];
  plantsToWaterToday.value = [];
  plantsToWaterTomorrow.value = [];

  const currentDate = new Date();
  nextWateringDates.value = plants.value.map((plant) => {
    return calculateNextWateringDate(plant.last_watered, plant.water_frequency);
  });

  for (let i = 0; i < plants.value.length; i++) {
    const plant = plants.value[i];
    const nextWateringDate = nextWateringDates.value[i].date;
    if (nextWateringDate < currentDate) {
      pastWateringPlants.value.push(plant);
    } else if (nextWateringDate.toDateString() === currentDate.toDateString()) {
      plantsToWaterToday.value.push(plant);
    } else if (nextWateringDate.toDateString() === new Date(currentDate.getTime() + 24 * 60 * 60 * 1000).toDateString()) {
      plantsToWaterTomorrow.value.push(plant);
    }
  }
};

const markWateringAsDone = (plant) => {
  const plantRef = doc(db, 'plants', plant.id);

  // Calculate the new lastWatered date based on the current date
  const currentDate = new Date();
  const newLastWatered = new Date(currentDate.getTime());

  // Update the Firestore document
  updateDoc(plantRef, { last_watered: newLastWatered.toISOString() })
    .then(() => {
      console.log('Plant watering marked as done successfully');
      // After marking as done, update the data and recalculate
      updatePlantData();
    })
    .catch((error) => {
      console.error('Error updating plant watering:', error);
    });
};

const showTips = ref(false);

const toggleTips = () => {
  showTips.value = !showTips.value;
};


</script>




<style lang="scss">

nav {
  visibility: hidden;
}
.schedule {
 
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

.main{
  ul {
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;        overflow: hidden;

  }
  
  display: flex;
  flex-direction: column;
  /* Add any other styles as needed */

  .tips-container {
    display: flex;
    justify-content: flex-end;
    /* Add any other styles as needed */

    .expand-button {
      cursor: pointer;
      transition: transform 0.3s;

      &.expanded {
        transform: rotate(90deg);
      }
    }

    .plant-tips {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.5s;

      .expand-fade-enter-active,
      .expand-fade-leave-active {
        transition: opacity 1s;
      }

      .expand-fade-enter,
      .expand-fade-leave-to /* .expand-fade-leave-active in <2.1.8 */ {
        opacity: 0;
      }
    }
  
}
}


</style>

