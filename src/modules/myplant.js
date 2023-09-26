// modules/myplant.js
import { ref } from 'vue';
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from '../firebase.js';

const myplants = ref([]);
const plantDataRef = collection(db, 'myplants');

const getPlantsData = () => {
  onSnapshot(plantDataRef, (snapshot) => {
    myplants.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  });
};

const addPlant = async (newPlantData) => {
  try {
    await addDoc(collection(db, 'myplants'), newPlantData);
  } catch (error) {
    console.error('Error adding plant:', error);
    throw error;
  }
};

const deletePlant = async (id) => {
  try {
    await deleteDoc(doc(db, 'myplants', id));
  } catch (error) {
    console.error('Error deleting plant:', error);
    throw error;
  }
};

export { myplants, getPlantsData, addPlant, deletePlant };
