<template>
  <div class="schedule w-[95vw] h-screen">
   
   
    <main class="shadow mt-3 flex">
      <div class="task-container w-4/12 flex flex-col">
        <div class="plant-tasks__past h-32">
          <h2 class="text-2lx">Plants Past Watering</h2>
          <ul>
            <li v-for="(plant, index) in pastWateringPlants" :key="index">
            <div v-if="plant">
              <strong>{{ plant.common_name }}</strong> - {{ daysAgo(plant.last_watered) }}
            </div>
            <!--   <strong>{{ plant.common_name }}</strong> - {{ daysAgo(plant.last_watered) }} -->
            </li>
          </ul>
        </div>
        <!-- Column 2: Plants to Water Today -->
        <div class="plant-tasks__past h-32">
          <h2 class="h2 text-2lx">Plants to Water Today</h2>
          <ul>
            <li v-for="(plant, index) in plantsToWaterToday" :key="index">
              <strong>{{ plant.common_name }}</strong>
            </li>
          </ul>
        </div>
           <!-- Column 3: Plants to Water Tomorrow -->
        <div class="plant-tasks__past h-32">
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
        <div class="countdown-container w-4/12   ">
          <h2 class="text-2xl">Plants Countdown</h2>
          <div class="div h-2/3 overflow-scroll cardbg">
          <ul class="countdown-card  flex flex-col  ">
            <li class="flex flex-col relative p-2 capitalize" v-for="(plant, index) in plants" :key="index">
              <strong>{{ plant.common_name }}</strong> - Water in {{ getDaysUntilWatering(plant) }} days
            
              <button class="absolute bottom-0 right-0  " @click="markWateringAsDone(plant)">
                <span> Water </span>
                <img src="../components/icons/waterdrop.svg" class="w-10 waterdrop" alt="">                
              </button>
            </li>
          </ul>
          </div>
          
        </div>
     
    </main>
   
  </div>
</template>

<script setup>
import { ref, onMounted, } from 'vue';
import { calculateNextWateringDate } from '@/modules/nextWatering';
import { getFirestore,  doc, updateDoc } from 'firebase/firestore';
import {
  plants,
  getPlantsData,
  pastWateringPlants,
  plantsToWaterToday,
  plantsToWaterTomorrow
} from '@/./modules/plants';
const db = getFirestore();

const nextWateringDates = ref([]);

onMounted(() => {
  getPlantsData();

  nextWateringDates.value = plants.value.map((plant) => {
    return calculateNextWateringDate(plant.last_watered, plant.water_frequency);
  });
});




// Function to calculate days until watering for a plant
const getDaysUntilWatering = (plant) => {
  const nextWateringDate = calculateNextWateringDate(plant.last_watered, plant.water_frequency).date;
  const currentDate = new Date();
  const timeDiff = nextWateringDate - currentDate;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
};

onMounted(() => {
  getPlantsData();
});

const daysAgo = (lastWateredDate) => {
  const lastWatered = new Date(lastWateredDate);
  const currentDate = new Date();

  const timeDiff = currentDate - lastWatered;
  const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return `${daysAgo} days ago`;
};


// Water Plants Past day - Water Plants Today - Water Plants Tomorrow

const markWateringAsDone = async (plant) => {
  const plantRef = doc(db, 'plants', plant.id);

  // Calculate the new lastWatered date based on the current date
  const currentDate = new Date();
  const newLastWatered = new Date(currentDate.getTime());

  try {
    // Update the Firestore document
    await updateDoc(plantRef, { last_watered: newLastWatered.toISOString() });
    console.log('Plant watering marked as done successfully');

    // Find the index of the updated plant in the plants array
    const plantIndex = plants.value.findIndex((p) => p.id === plant.id);

    if (plantIndex !== -1) {
      // Update the last_watered property of the plant in the local array
      plants.value[plantIndex].last_watered = newLastWatered.toISOString();
      
      // Re-run the updatePlantData function to categorize the tasks
      updatePlantData();
    } else {
      console.error('Plant not found in the local array.');
    }
  } catch (error) {
    console.error('Error updating plant watering:', error);
  }
};
const updatePlantData = async () => {
  await getPlantsData();

  const currentDate = new Date();

  pastWateringPlants.value = plants.value.filter((plant) => {
    const nextWateringDate = calculateNextWateringDate(plant.last_watered, plant.water_frequency).date;
    const daysUntilWatering = Math.ceil((nextWateringDate - currentDate) / (1000 * 60 * 60 * 24));
    return daysUntilWatering < 0;
  });

  plantsToWaterToday.value = plants.value.filter((plant) => {
  const nextWateringDate = calculateNextWateringDate(plant.last_watered, plant.water_frequency).date;
  const daysUntilWatering = Math.ceil((nextWateringDate - currentDate) / (1000 * 60 * 60 * 24));
  return daysUntilWatering === 0;
  });
  plantsToWaterTomorrow.value = plants.value.filter((plant) => {
    const nextWateringDate = calculateNextWateringDate(plant.last_watered, plant.water_frequency).date;
    const daysUntilWatering = Math.ceil((nextWateringDate - currentDate) / (1000 * 60 * 60 * 24));
    return daysUntilWatering === 1;
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

 
header {

  .header-container{
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

.waterdrop{
  
 filter: drop-shadow(3px 5px 1px $water);
  transition: all 0.5s ease-in-out; 
  &:hover{
  transition: all 0.5s ease-in-out; 
  transform: scale(1.2);
  
  }


}
</style>

