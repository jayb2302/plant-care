import { ref } from 'vue';
import { collection, onSnapshot} from 'firebase/firestore';
import { db } from '../firebase.js';

const users = ref([]);
const userDataRef = collection(db, 'users');

const getUsersData = () => {
  onSnapshot(userDataRef, (snapshot) => {
    users.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
};



export { users, getUsersData};
