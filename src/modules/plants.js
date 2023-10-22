// modules/myplant.js
import { ref } from 'vue';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase.js';

const plants = ref([]);
const plantDataRef = collection(db, 'plants');

const getPlantsData = () => {
  onSnapshot(plantDataRef, (snapshot) => {
    plants.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  });
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

export { plants, getPlantsData, addPlant, deletePlant };
