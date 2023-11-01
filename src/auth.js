import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

const getCurrentUser = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
     
      resolve(user);
    });
  });
};

export { getCurrentUser };

  

