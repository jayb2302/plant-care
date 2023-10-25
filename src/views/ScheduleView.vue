<template>
  <div class="schedule w-[95vw] ">
   
   
    <main class="shadow mt-3 flex h-[35vw] gap-2">
      <div class="task-container w-4/12 flex gap-5 flex-col cardbg">
        <h2 class="text-2xl">Upcoming Watering</h2>
        <div class="task-cards h-40 relative flex flex-col gap-3">
          <!-- Past Watering -->
          <div class="plant-tasks__past  h-32 p-2" :class="{ 'red-background': hasPastWateringPlants }">
              <h2 class="text-2lx text-justify bold">Urgent</h2>
              <ul>
                <li v-for="(plant, index) in pastWateringPlants"  :key="index">
                
                  <div class="relative shadow-md p-2" v-if="plant">
                  <p class=" justify text-xl"> <strong>{{ plant.common_name }}</strong>  <span class="right-2 absolute ">- {{ daysAgo(plant. last_watered) }}</span></p>
                  </div>
                <!--   <strong>{{ plant.common_name }}</strong> - {{ daysAgo(plant.last_watered) }} -->
                </li>
              </ul>
          </div>
          <!--  Plants to Water Today -->
          <div class="plant-tasks__past h-32 p-2" :class="{ 'yellow-background': hasPlantsToWaterToday }">
            <h2 class="h2 text-2lx bold ">Water Today</h2>
            <ul>
              <li v-for="(plant, index) in plantsToWaterToday" :key="index">
              <div class="relative shadow-md  p-2">
                <p class=" justify text-2xl capitalize"> <strong>{{ plant.common_name }}</strong> </p>

                </div>
              </li>
            </ul>
          </div>
            <!-- Plants to Water Tomorrow -->
          <div class="plant-tasks__past h-32 p-2" :class="{ 'green-background': hasPlantsToWaterTomorrow }">
            <h2 class="text-2lx">Water Tomorrow</h2>
            <ul>
              <li v-for="(plant, index) in plantsToWaterTomorrow" :key="index">
                <div class="relative shadow-md  p-2">
                <p class=" justify text-xl"><strong>{{ plant.common_name }}</strong></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
       
      </div>
     
       
  
        <!-- Column 5: Plants Countdown -->
        <div class="countdown-container w-4/12  cardbg  ">
          <h2 class="text-2xl">Overview</h2>
          <div class=" overflow-y-auto ">
          <ul class="countdown-card  flex flex-col  ">
            <li class="flex flex-col relative p-2 capitalize" v-for="(plant, index) in sortedPlantsCountdown" :key="index">
              <strong>{{ plant.common_name }}</strong> - Water in {{ getDaysUntilWatering(plant) }} days
              <button
                class="absolute bottom-0 right-0"
                
                @click="markWateringAsDone(plant)">
                <span> Water </span>
                <svg class="waterdrop" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-5 -2 24 24">
                  <path fill="#D4D8EB" d="M2 13a5 5 0 0 0 10 0c0-1.726-1.66-5.031-5-9.653C3.66 7.969 2 11.274 2 13zM7 0c4.667 6.09 7 10.423 7 13a7 7 0 0 1-14 0c0-2.577 2.333-6.91 7-13z"/>
                </svg>
              </button>
            </li>
          </ul>
          </div>
          
        </div>
     
      <!--  Plant Care Tips & Notes -->
        
      <div class="tips-container w-4/12 cardbg">
        <button @click="toggleTips" class="widgetsbtn expand-button fixed right-5 bottom-10" :class="{ 'expanded': showTips }">
          <div class="widgetsbtn__horizontal"></div>
          <div class="widgetsbtn__vertical"></div>
          {{ showTips ? 'Hide Tips' : 'Plant Tips' }}
        </button>
        <transition name="expand-fade" mode="out-in">
          <div v-if="showTips || showNotes" key="content">
            <!-- Plant Care Tips -->
            <div v-if="showTips" class="plant-tips absolute right-10 bottom-10">
              <h2 class="text-2lx">Plant Care Tips</h2>
              <ul>
                <li v-for="(tip, index) in plantCareTips" :key="index">{{ tip }}</li>
              </ul>
            </div>

            <!-- Notes Component -->
            <div v-if="showNotes" class="notes-container w-7/12 absolute left-5 bottom-5">
              <AddUserNotes /> <!-- Render your notes component here -->
            </div>
          </div>
        </transition>
        <button @click="toggleNotes" class="widgetsbtn expand-button fixed right-5 bottom-28">
          <div class="widgetsbtn__horizontal"></div>
          <div class="widgetsbtn__vertical"></div>
            My Notes
        </button> 

      </div>
    </main>
   
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { calculateNextWateringDate } from '@/modules/nextWatering';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import {
  plants,
  getPlantsData,
  pastWateringPlants,
  plantsToWaterToday,
  plantsToWaterTomorrow
} from '@/./modules/plants';
import AddUserNotes from '../components/AddUserNotes.vue'; '../components/AddUserNotes.vue';
const db = getFirestore();

const nextWateringDates = ref([]);
const showNotes = ref(false);

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

const markWateringAsDone = async (plant) => {
  console.log("test click");
  const plantRef = doc(db, 'plants', plant.id);

  // Calculate the new lastWatered date based on the current date
  const currentDate = new Date();
  const newLastWatered = new Date(currentDate.getTime());

  try {
    // Update the Firestore document
    await updateDoc(plantRef, { last_watered: newLastWatered.toISOString() });
    console.log('Plant watering marked as done successfully');

    // Update the local data directly (if needed)
    const plantIndex = plants.value.findIndex((p) => p.id === plant.id);
    if (plantIndex !== -1) {
      plants.value[plantIndex].last_watered = newLastWatered.toISOString();
      // No need to call updatePlantData here
    } else {
      console.error('Plant not found in the local array.');
    }
  } catch (error) {
    console.error('Error updating plant watering:', error);
  }
};

// Use watch to observe changes in the 'plants' ref
watch(plants, () => {
  // Update data when 'plants' changes
  updatePlantData();
});

const updatePlantData = () => {
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

const daysAgo = (lastWateredDate) => {
  const lastWatered = new Date(lastWateredDate);
  const currentDate = new Date();
  const timeDiff = currentDate - lastWatered;
  const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return `${daysAgo} days ago`;
};

const sortedPlantsCountdown = computed(() => {
  return [...plants.value].sort((a, b) => {
    const daysUntilWateringA = getDaysUntilWatering(a);
    const daysUntilWateringB = getDaysUntilWatering(b);
    return daysUntilWateringA - daysUntilWateringB;
  });
});

const showTips = ref(false);

const toggleTips = () => {
  showTips.value = !showTips.value;
};

const toggleNotes = () => {
  showNotes.value = !showNotes.value; // Toggle the visibility of the notes component
};

const hasPastWateringPlants = computed(() => pastWateringPlants.value.length > 0);
const hasPlantsToWaterToday = computed(() => plantsToWaterToday.value.length > 0);
const hasPlantsToWaterTomorrow = computed(() => plantsToWaterTomorrow.value.length > 0);
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

h2 {
  font-family: $heading-font;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 2px 1px 2px rgba(0,0,0,0.3), 
       -2px 0px 2px rgba(255,255,255,0.3);
       font-size: larger;
  font-weight: 800;
}

.waterdrop{
  
  filter: drop-shadow(3px 1px 1px $water) drop-shadow(-2px 1px 1px $white) drop-shadow(0px 0px 5px #d1c5c568) ;
  transition: all 0.5s ease-in-out; 
  
  &:hover{
  transition: all 0.5s ease-in-out; 
  transform: scale(1.2);
  color: $beige;
  }
  &:active{
    transition: all 0.5s ease-in-out; 
    transform: scale(1.2);
    color: $focus;
  }
}


</style>

