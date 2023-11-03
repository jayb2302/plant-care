import { ref } from 'vue';
import { collection, onSnapshot, query, where} from 'firebase/firestore';
import { db } from '../firebase.js';

const users = ref([]);
const userDataRef = collection(db, 'users');
// In users.js
const getUsersData = (userId) => {
  return new Promise((resolve, reject) => {
    const q = query(userDataRef, where('userId', '==', userId)); 

    onSnapshot (q, (snapshot) => {
      if (snapshot.docs.length > 0) {
        const userData = snapshot.docs[0].data(); // Assuming there's only one matching document
        resolve(userData);
      } else {
        reject(new Error('User data not found', userId ));
      }
    });
  });
};

export { users, getUsersData};
