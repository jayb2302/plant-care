import { ref } from 'vue';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase.js';

const sites = ref([]);
const siteDataRef = collection(db, 'sites');
const deletedSites = ref([]); // Initialize as an empty array

const fetchSitesData = () => {
  onSnapshot(siteDataRef, (snapshot) => {
    sites.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  });
};

const createSite = async (newSiteData) => {
  try {
    await addDoc(collection(db, 'sites'), newSiteData);
  } catch (error) {
    console.error('Error adding site:', error);
    throw error;
  }
};

const getSiteName = (siteId) => {
  const matchingSite = sites.value.find((site) => site.id === siteId);
  return matchingSite ? matchingSite.name : 'Site not found';
};

const removeSite = async (site) => {
  // Store the site in case we need to undo the delete
  deletedSites.value.push(site);

  // Delete the site from Firestore
  await deleteDoc(doc(db, 'sites', site.id));
};

const undoDelete = async () => {
  if (deletedSites.value.length > 0) {
    try {
      const siteToAddBack = deletedSites.value.pop();
      await addDoc(collection(db, 'sites'), siteToAddBack);
      console.log('Site added back:', siteToAddBack);
    } catch (error) {
      console.error('Error adding back the site:', error);
    }
  }
}

export { sites, fetchSitesData as getSitesData, createSite as addSite, removeSite as deleteSite, getSiteName as findSiteName, undoDelete };
