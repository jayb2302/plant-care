// modules/site.js
import { ref, onMounted } from 'vue';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase.js';

export const useSites = () => {
  const sites = ref([]);

  const getSitesData = () => {
    const siteDataRef = collection(db, 'sites');
    onSnapshot(siteDataRef, (snapshot) => {
      sites.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  };

  onMounted(() => {
    getSitesData();
  });

  return {
    sites,
  };
};
