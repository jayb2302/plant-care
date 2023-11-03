// modules/myplant.js
import { ref } from 'vue';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase.js';
import { calculateNextWateringDate } from './nextWatering';
import { useNextWateringDates } from './nextWateringUtils';

const plants = ref([]);
const plantDataRef = collection(db, 'plants');
const pastWateringPlants = ref([]);
const plantsToWaterToday = ref([]);
const plantsToWaterTomorrow = ref([]);

const getPlantsData = async () => {
  await onSnapshot(plantDataRef, (snapshot) => {
   
    plants.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      common_name: doc.data().common_name.length < 25 ? doc.data().common_name : doc.data().common_name.substring(0, 13) + '...'
    }))
    fetchPlantsAndCalculateNextWateringDates();
  });
};
const { nextWateringDates } = useNextWateringDates();

const fetchPlantsAndCalculateNextWateringDates = async () => {
  // Calculate next watering dates and categorize plants
  const currentDate = new Date();
  nextWateringDates.value = plants.value.map((plant) => {
    return calculateNextWateringDate(plant.last_watered, plant.water_frequency);
  });

  pastWateringPlants.value = [];
  plantsToWaterToday.value = [];
  plantsToWaterTomorrow.value = [];

  for (let i = 0; i < plants.value.length; i++) {
    const plant = plants.value[i];
    const nextWateringDate = nextWateringDates.value[i].date;
    const daysUntilWatering = Math.ceil((nextWateringDate - currentDate) / (1000 * 60 * 60 * 24));

    if (daysUntilWatering < 0) {
      pastWateringPlants.value.push(plant);
    } else if (daysUntilWatering === 0) {
      plantsToWaterToday.value.push(plant);
    } else if (daysUntilWatering === 1) {
      plantsToWaterTomorrow.value.push(plant);
    }
  }

};

const addPlant = async (newPlantData) => {
  try {
    await addDoc(collection(db, 'plants'), newPlantData);
  } catch (error) {
    console.error('Error adding plant:', error);
    throw error;
  }
};

const deletePlant = async (id) => {
  try {
    await deleteDoc(doc(db, 'plants', id));
  } catch (error) {
    console.error('Error deleting plant:', error);
    throw error;
  }
};

export { plants, getPlantsData, addPlant, deletePlant, pastWateringPlants, plantsToWaterToday, plantsToWaterTomorrow };
