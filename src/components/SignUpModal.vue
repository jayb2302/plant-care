<template>
    <div class="signInSignUp-wrapper items-center m-atuo flex justify-center">
      <button class="pt-4 pr-4" @click="closeModal">
        <svg class="close-btn" xmlns="http://www.w3.org/2000/svg" width="17.828" height="17.828">
          <path d="m2.828 17.828 6.086-6.086L15 17.828 17.828 15l-6.086-6.086 6.086-6.086L15 0 8.914 6.086 2.828 0 0 2.828l6.085 6.086L0 15l2.828 2.828z" />
        </svg>
      </button>
      <div class="signInSignUp-container flex ">
        <div class="card flex gap-5 flex-col">
          <h1 class="text-2xl font-semibold mb-3 mt-5">Create New Account</h1>
          <div class="userName">
            <label for="userName" class="block text-gray-600">Username</label>
            <input type="text" placeholder="" required v-model="username" class="w-full h-10" />
          </div>
          <div class="emailInput">
            <label for="email" class="block text-gray-600">Email</label>
            <input id="email" type="text" v-model="email" required class="w-full h-10" />
          </div>
          <div class="passwordInput">
            <label for="password" class="block text-gray-600">Password</label>
            <input id="password" type="password" v-model="password" required class="w-full h-10" />
          </div>
          <button @click="signUp" class="enter">
            Submit
          </button>
          <router-link class="signin" to="/signin">
            Log in
          </router-link>
        </div>
      </div>
    </div>
</template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
  import { getFirestore, collection, addDoc } from 'firebase/firestore';
  
  // Create references to the form fields
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const $emit = defineEmits(['registration-success', 'close']);
 
  
  // Define the sign-up function
  const signUp = async () => {
    const auth = getAuth(); // Get the authentication instance
    const firestore = getFirestore(); // Get the Firestore instance
  
    try {
      // Create a new user with email and password
      await createUserWithEmailAndPassword(auth, email.value, password.value);
  
      // Save user data in Firestore
      await addDoc(collection(firestore, 'users'), {
        username: username.value,
        email: email.value,
        userId: auth.currentUser.uid,
      });
  
      console.log('Successfully registered!');
  
      // Emit an event to notify the parent component about successful registration
      // and close this modal.
      $emit('registration-success');
    } catch (error) {
      console.error('Error during user registration:', error);
      alert(error.message); // Display the error message
    }
  };
  
  const closeModal = () => {
    // Close the modal and show the SignInModal
    $emit('close');
  };
  
  </script>
  



<style lang="scss" scoped>

</style>