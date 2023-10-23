// modules/site.js
// modules/plant.js
import { ref } from 'vue';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase.js';

const sites= ref([]);
const siteDataRef = collection(db, 'plants');

const getSitesData = () => {
  onSnapshot(siteDataRef, (snapshot) => {
    sites.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  });
};

const addSite = async (newSiteData) => {
  try {
    await addDoc(collection(db, 'sites'), newSiteData);
  } catch (error) {
    console.error('Error adding site:', error);
    throw error;
  }
};

const deleteSite = async (id) => {
  try {
    await deleteDoc(doc(db, 'sites', id));
  } catch (error) {
    console.error('Error deleting site:', error);
    throw error;
  }
};
const findSiteName = (siteId) => {
  const matchingSite = sites.value.find((site) => site.id === siteId);
  return matchingSite ? matchingSite.name : 'Site not found';
};

export { sites, getSitesData, addSite, deleteSite, findSiteName};

