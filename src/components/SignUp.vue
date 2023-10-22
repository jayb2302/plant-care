

<template>
    <div id="app" class="logIn-wrapper  
         "> 
        <button class="pt-4 pr-4" @click="$emit('close')">
            <svg class="close-btn" xmlns="http://www.w3.org/2000/svg" width="17.828" height="17.828">
                <path d="m2.828 17.828 6.086-6.086L15 17.828 17.828 15l-6.086-6.086 6.086-6.086L15 0 8.914 6.086 2.828 0 0 2.828l6.085 6.086L0 15l2.828 2.828z"/>
            </svg>
        </button>
        <div class="logIn-container  flex  
           ">
            <div class="card  flex gap-5 flex-col 
                 ">
               
                 <h1 class="text-2xl font-semibold mb-5">Create New Account</h1>
                <div class="userName">
                    <label for="userName" class="block text-gray-600">Username</label>
                    <input
                        type="text"
                        placeholder=""
                        required
                        v-model="username"
                        class="w-full h-10">                
                    </div>
                <div class="emailInput">
                    <label for="email" class="block text-gray-600">Email</label>
                    <input
                        id="email"
                        type="text"
                        v-model="email"
                        required
                        class="w-full h-10"
                    />
                </div>
                <div class="passwordInput">
                    <label for="password" class="block text-gray-600">Password</label>
                    <input
                        id="password"
                        type="password"
                        v-model="password"
                        required
                        class="w-full h-10"
                    />
                </div>
                <button 
                    @click="signUp" 
                    class="enter">
                    Submit
                </button>
                <router-link class="signin" 
                    to="/signin">
                    Log in
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref as refVue } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'vue-router'
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const username = refVue("")
const email = refVue("")
const password = refVue("")
const router = useRouter()

const signUp = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      console.log("Successfully registered!");
      //Store the username in Firestore
      addDoc(collection(getFirestore(), "users"), {
        username: username.value,
        email: email.value,
      })
        .then(() => {
          console.log("Username and email saved in Firestore");
          router.push('/signin');
        })
        .catch((error) => {
          console.error("Error saving username and email in Firestore:", error);
        });
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};

</script>



<style lang="scss" scoped>

</style>