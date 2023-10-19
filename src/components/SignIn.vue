<template>
    <div class="logIn-wrapper">
        <h1 class="text-2xl font-semibold mb-5">Log in</h1>
        <div class="logIn-container">
            <button @click="$emit('close')">Close</button>
            <div class="emailInput">
            <label for="email" class="block text-gray-600">Email</label>
            <input
                id="email"
                type="text"
                v-model="email"
                required
                class=""
            />
            </div>
            <div class="passwordInput">
            <label for="password" class="block text-gray-600">Password</label>
            <input
                id="password"
                type="password"
                v-model="password"
                required
                class=""
            />
            </div>
            <div class="mb-4 text-red-600">{{ errMsg }}</div>
            <button @click="logIn" class="logIn-btn"> 
                Log in
            </button>

            
        </div>
        <button class="register-btn" @click="showRegisterModal">
            Register
        </button>

        <Teleport to="main">
            <div class="register modal" v-if="showModal">
                <div class="modal-content"> 
                <!-- Render SignIn.vue component here -->
                <RegisterNew @close="closeModal" />
                </div>
            </div>
        </Teleport>
    </div>
</template>
<script setup>
    import { ref as refVue } from "vue"
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
    import { useRouter } from 'vue-router'
    import RegisterNew from "../views/RegisterNew.vue"

    const email = refVue("")
    const password = refVue("")
    const errMsg = refVue()
    const router = useRouter()

    const showModal = refVue(false); // This variable controls the modal visibility

    const showRegisterModal = () => {
    // Set a reactive variable to indicate that the modal should be shown
    showModal.value = true;
    };

    const closeModal = () => {
    showModal.value = false;
    };

    const logIn = () => {
        signInWithEmailAndPassword(getAuth(), email.value, password.value)
            // eslint-disable-next-line no-unused-vars
            .then((data) => {
                console.log("Successfully signed in!")
                router.push('/adminhome')
               
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
 
</script>


<style lang="scss">
    .logIn-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: rgba(180, 180, 180, .2);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    gap: 20px;
    height: 260px;
    width: 260px;
    border: 1px solid rgba(150, 150, 150, .3);
    border-radius: 10px;
    box-shadow: 0px 0px 25px ;
    overflow: hidden;
    padding: 40px;
}
        .logIn-container {
            background-color: aqua;
        }
    
</style>
