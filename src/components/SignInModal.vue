<template>
    <div class="logIn-wrapper">
        <button @click="$emit('close')"> 
            <svg class="back-btn" xmlns="http://www.w3.org/2000/svg" width="24.703" height="24.928">
                <path d="M1.056 21.928c0-6.531 5.661-9.034 10.018-9.375V18.1L22.7 9.044 11.073 0v4.836a10.5 10.5 0 0 0-7.344 3.352C-.618 12.946-.008 21 .076 21.928z"/>
            </svg> 
        </button>
        <h1 class="text-4xl font-semibold mt-4 text-center  mb-5">Log in</h1>
        <div class="logIn-container">
            
            <div class="emailInput">
            <label name="emeil" class="block text-gray-600">Email</label>
            <input
                id="email"
                type="text"
                v-model="email"
                required
                class="w-full h-10"
            />
            </div>
            <div class="passwordInput">
            <label name="password" class="block text-gray-600">Password</label>
            <input
                id="password"
                type="password"
                v-model="password"
                required
                class="w-full h-10"
                @keydown.enter="checkEnterKey"
            />
            </div>
            <div class="mb-4 text-red-600">{{ errMsg }}</div>
            <button @click="SignIn"  class="logIn-btn"> 
                Log in
            </button>

            
        </div>
        <button class="register-btn" @click="showRegisterModal">
            Register
        </button>

        <Teleport to="body">
            <transition 
                v-motion
                :initial="{
                opacity: 0,
                y: 0,
                }"
                :variants="{ custom: { scale: 2 } }"
                :enter="{
                opacity: 1,
                y: 0,
                }"
                :leave="{
                opacity: 0,
                y: 0,
                }" 
            >
            <div class="modal" v-if="showModal">
                <div class=""> 
                
                    <SignUpModal @close="closeModal" />
                </div>
            </div>
        </transition>
        </Teleport>
    </div>
</template>
<script setup>
    import { ref as refVue } from "vue"
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
    import { useRouter } from 'vue-router'
    import SignUpModal from '../components/SignUpModal.vue'

    const email = refVue("")
    const password = refVue("")
    const errMsg = refVue()
    const router = useRouter()

    const showModal = refVue(false); // This variable controls the modal visibility
    const SignIn = () => {
        signInWithEmailAndPassword(getAuth(), email.value, password.value)
            // eslint-disable-next-line no-unused-vars
            .then((data) => {
                console.log("Successfully signed in!")
                if (router.currentRoute.value.path === '/adminpanel') {
                    // If the router is already at /adminpanel, close the modal
                    closeModal()
                } else {
                    router.push('/signin');
                }
                
               
            })
            .catch((error) => {
                console.log(error.code)
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
                        errMsg.value = "Email or password was incorrect"
                }
            })
            
    }
    
    const checkEnterKey = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submission behavior
      SignIn();
    }
  };
    const showRegisterModal = () => {
    // Set a reactive variable to indicate that the modal should be shown
    showModal.value = true;
    };


    const closeModal = () => {
        showModal.value = false;
    };

 
 
</script>


<style lang="scss">
    .logIn-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-family: $title-font;
        color: $black;
        backdrop-filter: blur(10px);
        display: flex;
        flex-direction: column;
        gap: 20px;
        border: 1px solid rgba(150, 150, 150, 0.284);
        border-radius: 10px;
        box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;        overflow: hidden;
        padding: 2rem 3rem;
        background-color: $signinbg;

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
        .logIn-container {
            background-color: none;
        }
    
</style>
