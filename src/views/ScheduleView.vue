<template>
  <div class="schedule w-full ">
    <main class="shadow  pb-5 w-full mt-2 lg:flex justify-center lg:gap-5">
      <!-- Tips & Notes -->
      <div class="btn-wrapper top-0 flex relative justify-center  gap-5">
        <button @click="toggleNotes" class="widgetsbtn relative    lg:fixed  lg:left-52 xl:left-32  expand-button">
          <div class="widgetsbtn__horizontal"></div>
          <div class="widgetsbtn__vertical"></div>
          My Notes
        </button>
        <button @click="toggleTips" class="widgetsbtn relative lg:fixed  lg:left-10 xl:left-80" :class="{ 'expanded': showTips }">
          <div class="widgetsbtn__horizontal"></div>
          <div class="widgetsbtn__vertical"></div>
          {{ showTips ? 'Hide Tips' : 'Plant Tips' }}
        </button>
      </div>
      <div class="tips-container   relative h-[25vh] lg:h-[75vh] md:mt-5 lg:w-4/12 cardbg">
        <transition name="expand-fade" mode="out-in">
          <div v-if="showTips || showNotes" key="content">
            <!-- Plant Care Tips -->
            <div v-if="showTips" class="plant-tips mt-4 overflow-y-auto h-44  lg:h-[65vh] lg:mt-14 text cardbg divide-y-2">
              <div v-for="(tip, index) in plantTips" :key="index" class=" tip pl-3 pt-3 pb-3">
                <h2 >{{ tip.title }}</h2>
                <p>{{ tip.content }}</p>
              </div>
            </div>
            <!-- Notes Component -->
            <div v-if="showNotes" class="notes-container relative  h-56 z-40 bottom-1">
              <AddUserNotes /> <!-- Render your notes component here -->
            </div>
          </div>
        </transition>
        
      </div>

      <div class="top-10 lg:mt-5  cardbg gradient z-40 mx-4 md:mb-1 mt-10 sticky ">
        <h2 class="text-md md:text-2xl pl-4 mb-3">
          Upcoming Watering
        </h2>
        <div class="task-cards h-6/6 relative flex flex-col gap-3">
          <!-- Past Watering -->
          <h2 :class="{ 'red-background': hasPastWateringPlants, 'error-message': hasPastWateringPlants }" class="pl-3 text-lg text-justify -top-0 ">
            Urgent
            <button class="absolute right-5" @click="isUrgentExpanded = !isUrgentExpanded">
              <span v-if="isUrgentExpanded">▲</span>
              <span v-else>▼</span>
            </button>
          </h2>
          <div v-if="isUrgentExpanded"
            class="task-container h-3/6 flex flex-col invisible   gap-5 cardbg flex-grow overflow-auto"
            :class="{ 'expanded': isUrgentExpanded, 'red-background': hasPastWateringPlants }">
            <ul>
              <li v-for="(plant, index) in pastWateringPlants" :key="index">
                <div class="relative shadow-md p-2">
                  <p v-if="hasPastWateringPlants" class="text-md ">
                    <strong>{{ plant.common_name }}</strong><br>
                    <span class="pl-2 ">watered - {{ daysAgo(plant.last_watered) }}</span>
                  </p>
                  <p v-else>  
                    You are doing awesome!!
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <!-- Plants to Water Today -->
          <h2 :class="{ 'yellow-background': hasPlantsToWaterToday }" class="h2 pl-3  relative text-2lx bold">
            Water Today
            <button class="absolute right-5" @click="isWaterTodayExpanded = !isWaterTodayExpanded">
              <span v-if="isWaterTodayExpanded">▲</span>
              <span v-else>▼</span>
            </button>
          </h2>
          <div v-if="isWaterTodayExpanded"
            class="task-container h-2/6 flex flex-col invisible gap-5 cardbg flex-grow overflow-auto"
            :class="{ 'expanded': isWaterTodayExpanded, 'yellow-background': hasPlantsToWaterToday }">
            <ul>
              <li v-for="(plant, index) in plantsToWaterToday" :key="index">
                <div class="relative shadow-md p-2">
                  <p class="justify text-md capitalize">
                    <strong>{{ plant.common_name }}</strong>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <!-- Plants to Water Tomorrow -->
          <h2 :class="{ 'green-background': hasPlantsToWaterTomorrow }" class="text-2lx pl-3 relative">
            Water Tomorrow
            <button class="absolute right-5" @click="isWaterTomorrowExpanded = !isWaterTomorrowExpanded">
              <span v-if="isWaterTomorrowExpanded">▲</span>
              <span v-else>▼</span>
            </button>
          </h2>
          <div v-if="isWaterTomorrowExpanded"
            class="task-container h-2/6 flex flex-col gap-5 cardbg invisible flex-grow overflow-auto"
            :class="{ 'expanded': isWaterTomorrowExpanded, 'green-background': hasPlantsToWaterTomorrow }">
            <ul>
              <li v-for="(plant, index) in plantsToWaterTomorrow" :key="index">
                <div class="relative shadow-md p-2">
                  <p class="justify text-md">
                    <strong>{{ plant.common_name }}</strong>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Column 5: Plants Countdown -->
      <div class="countdown-container lg:w-4/12 mt-5 cardbg">
        <h2 class="text-2xl">Overview</h2>
        <div class="overflow-y-auto cardbg h-[60vh]  md:mt-5">
          <ul class="countdown-card flex flex-col">
            <li class="flex flex-col relative p-2 capitalize" v-for="(plant, index) in sortedPlantsCountdown"
              :key="index">
              <strong>
              {{ plant.plant_nickname }}
              </strong> 
             {{ plant.common_name }} <br>- Water next in {{ getDaysUntilWatering(plant) }} days
              <button class="water-button absolute bottom-2 right-1" @click="markWateringAsDone(plant)">
                <span > Water </span>
                <svg class="waterdrop" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-5 -2 24 24">
                  <path fill="#D4D8EB"
                    d="M2 13a5 5 0 0 0 10 0c0-1.726-1.66-5.031-5-9.653C3.66 7.969 2 11.274 2 13zM7 0c4.667 6.09 7 10.423 7 13a7 7 0 0 1-14 0c0-2.577 2.333-6.91 7-13z" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { calculateNextWateringDate } from '@/modules/nextWatering'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { plants, getPlantsData, pastWateringPlants, plantsToWaterToday, plantsToWaterTomorrow } from '@/modules/plants'
import AddUserNotes from '../components/AddUserNotes.vue'
import { getCurrentUser } from '../auth'
import { wateringTips } from '@/modules/planttips.js'
import { useToast } from 'vue-toastification'

let userId; // Define userId here.
const plantTips = wateringTips;
const db = getFirestore();
const isUrgentExpanded = ref(false);
const isWaterTodayExpanded = ref(false);
const isWaterTomorrowExpanded = ref(false);
const nextWateringDates = ref([]);
const showNotes = ref(false);
const showTips = ref(true);


const hasPastWateringPlants = computed(() => pastWateringPlants.value.length > 0);
const hasPlantsToWaterToday = computed(() => plantsToWaterToday.value.length > 0);
const hasPlantsToWaterTomorrow = computed(() => plantsToWaterTomorrow.value.length > 0);

const setUser = async () => {
  const user = await getCurrentUser();
  if (user && user.uid) {
    userId = user.uid;
    fetchUserPlants(); // Fetch user-specific plants when userId is available
  } else {
    console.error('User is not authenticated or user data is unavailable.');
  }
};
const userPlants = ref([]); // Initialize an empty array.

const fetchUserPlants = () => {
  userPlants.value = plants.value.filter((plant) => plant.userId === userId);
};
onMounted(() => {
  getPlantsData();
  setUser(); // Set the user and fetch user-specific plants.
  nextWateringDates.value = userPlants.value.map((plant) => {
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
  const toast = useToast(); 
  const plantRef = doc(db, 'plants', plant.id);

  // Calculates the new lastWatered date based on the current date
  const currentDate = new Date();
  const newLastWatered = new Date(currentDate.getTime());

  try {
    // Updating the Firestore document
    await updateDoc(plantRef, { last_watered: newLastWatered.toISOString() });
    toast.success("Great job! You've watered your plant!", {
          position: "bottom-center",
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false
        });
    
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
    toast.error('Error updating plant watering:', {
      position: "top-right",
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.53,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: "fas fa-rocket",
      rtl: false
    });
  }
};

// Observing changes in the 'plants' ref
watch(plants, () => {
  // Update data when 'plants' changes
  fetchUserPlants();
  updatePlantData();
});

const updatePlantData = () => {
  const currentDate = new Date();

  pastWateringPlants.value = userPlants.value.filter((plant) => {
    const nextWateringDate = calculateNextWateringDate(plant.last_watered, plant.water_frequency).date;
    const daysUntilWatering = Math.ceil((nextWateringDate - currentDate) / (1000 * 60 * 60 * 24));
    return daysUntilWatering < 0;
  });

  plantsToWaterToday.value = userPlants.value.filter((plant) => {
    const nextWateringDate = calculateNextWateringDate(plant.last_watered, plant.water_frequency).date;
    const daysUntilWatering = Math.ceil((nextWateringDate - currentDate) / (1000 * 60 * 60 * 24));
    return daysUntilWatering === 0;
  });

  plantsToWaterTomorrow.value = userPlants.value.filter((plant) => {
    const nextWateringDate = calculateNextWateringDate(plant.last_watered, plant.water_frequency).date;
    const daysUntilWatering = Math.ceil((nextWateringDate - currentDate) / (1000 * 60 * 60 * 24));
    return daysUntilWatering === 1;
  });
};

const daysAgo = (lastWateredDate) => {
  const lastWatered = new Date(lastWateredDate);
  const currentDate = new Date();
  const timeDiff = currentDate - lastWatered; // Calculate time difference as current date minus lastWatered
  const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return `${daysAgo} days ago`;
};

const sortedPlantsCountdown = computed(() => {
  return [...userPlants.value].sort((a, b) => {
    const daysUntilWateringA = getDaysUntilWatering(a);
    const daysUntilWateringB = getDaysUntilWatering(b);
    return daysUntilWateringA - daysUntilWateringB;
  });
});

const toggleTips = () => {
  showTips.value = !showTips.value;
  showNotes.value = false; // Close the Notes
};

const toggleNotes = () => {
  showNotes.value = !showNotes.value;
  showTips.value = false; // Close Plant Tips when opening Notes
};
</script>

<style lang="scss">
nav {
  visibility: hidden;
}

header {
  .header-container {
    .adminh1 {
      font-size: 3em;
      font-weight: 800;
      text-shadow: 2px 3px 3px rgba(170, 165, 165, 0.3),
        0px -7px 10px rgba(255, 255, 255, 0.3, ), -4px 2px 3px rgba(255, 255, 255, 0.3);
      font-family: $heading-font;
      color: $subheading-text;
    }
  }
}

.schedule {
  .main {
    ul {
      box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
      overflow: hidden;
    }
    display: flex;
    flex-direction: column;

    .tips-container {
      display: flex;
      justify-content: flex-end;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
     padding-top: 2%;
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
        transition: max-height 0.9s;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
        
        background-color: antiquewhite;
        .expand-fade-enter-active,
        .expand-fade-leave-active {
          transition: opacity 8s;
        }

        .expand-fade-enter,
        .expand-fade-leave-to {
          opacity: 0;
        }
      }

    }
  }
}

h2 {
  font-family: $heading-font;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-shadow: 2px 1px 2px rgba(0, 0, 0, 0.3),
    -2px 0px 2px rgba(255, 255, 255, 0.3);
  font-size: 1em;
  font-weight: 800;
}

.water-button {
  display: block;
  border: none;
  cursor: pointer;
  transition: transform 0.3s;
  span {
    display: none;
    position:absolute;
    top: -40%;
    right: 15%;
  }
  &:hover > span {
    display: block;
    transition: transform 0.3s;
  }
}

.waterdrop {
  filter: drop-shadow(3px 1px 1px $water) drop-shadow(-2px 1px 1px $white) drop-shadow(0px 0px 5px #d1c5c568);
  transition: all 0.5s ease-in-out;
  &:hover {
    transition: all 0.5s ease-in-out;
    transform: scale(1.2);
    color: $beige;
  }
  &:active {
    transition: all 0.5s ease-in-out;
    transform: scale(1.2);
    color: $focus;
  }
}
</style>

