<template>
    <div class="signInSignUp-wrapper logIn-wrapper flex flex-col">
      <button @click="$emit('close')">
        <svg class="back-btn" xmlns="http://www.w3.org/2000/svg" width="24.703" height="24.928">
          <path d="M1.056 21.928c0-6.531 5.661-9.034 10.018-9.375V18.1L22.7 9.044 11.073 0v4.836a10.5 10.5 0 0 0-7.344 3.352C-.618 12.946-.008 21 .076 21.928z" />
        </svg>
      </button>
      <h1 class="text-4xl font-semibold mt-4 text-center mb-5">Log in</h1>
      <div class="signInSignUp-container">
        <div class="emailInput">
          <label for="email" class="block text-gray-600">Email</label>
          <input id="email" type="text" v-model="email" required class="w-full h-10" />
        </div>
        <div class="passwordInput">
          <label for="password" class="block text-gray-600">Password</label>
          <input id="password" type="password" v-model="password" required class="w-full h-10" @keydown.enter="checkEnterKey" />
        </div>
        <div class="mb-4 text-red-600">{{ errMsg }}</div>
        <button @click="signIn" class="logIn-btn">Log in</button>
      </div>
      <button class="register-btn" @click="showRegisterModal">Register</button>
      <Teleport to="body">
        <transition
          v-motion
          :initial="{ opacity: 0, y: 0 }"
          :variants="{ custom: { scale: 2 } }"
          :enter="{ opacity: 1, y: 0 }"
          :leave="{ opacity: 0, y: 0 }"
        >
          <div class="modal" v-if="showModal">
            <div class="">
              <SignUpModal @registration-success="closeSignUpModal" @close="closeModal" />
            </div>
          </div>
        </transition>
      </Teleport>
    </div>
</template>
  
<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import SignUpModal from './SignUpModal.vue';

const email = ref('');
const password = ref('');
const errMsg = ref('');
const router = useRouter();
const showModal = ref(false);
defineEmits(['closeModal']);

const signIn = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      console.log("Successfully signed in!");
      const currentRoute = router.currentRoute.value.path;
      if (currentRoute === '/adminpanel') {
        closeModal();
      } else {
        router.push('/adminpanel');
      }
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
      }
    });
};
  
const checkEnterKey = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    signIn();
  }
};
  
const showRegisterModal = () => {
  showModal.value = true;
};
  
const closeModal = () => {
  showModal.value = false;
};
  
const closeSignUpModal = () => {
  showModal.value = false; // Close the registration modal here
};

</script>
  


<style lang="scss">
    .signInSignUp-wrapper {
        font-family: $title-font;
        color: $black;
        backdrop-filter: blur(10px);    
        border: 1px solid rgba(150, 150, 150, 0.284);
        border-radius: 10px;
        box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;        overflow: hidden;
        padding: 2rem 3rem;
        background-color: $signinbg;
        .signInSignUp-container {
            background-color: none;
            
        }
        .back-btn{
            transform: scalex(-1) scale(1.3);
            position: absolute;
            left: 5%;
            top: 5%;
            fill: $darkbeige;
            &:hover{
                transform: scaleX(-1) scale(1.9);
                transition: all 0.5s ease-in-out;
                fill: $backhover;
            }
        }
}
       
    
</style>
