
<script setup>

import { ref as refVue } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'vue-router'

const email = refVue("")
const password = refVue("")
const router = useRouter()

const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then(() => {
            console.log("Successfully registered!")
            router.push('/signin')
        })
        .catch((error) => {
            console.log(error.code)
            alert(error.message);
        })
}




</script>

<template>
    <div id="app" class="w-screen pb-5 flex 
        content-center justify-center">
        <div class="container flex justify-center 
            mt-6 pt-5 top-20">
            <div class="card gap-6 flex flex-col 
                justify-center items-center">
                <h1>Create an Account</h1>
                <div class="inputBox">
                    <input type="text" 
                    v-model="email" required="required">
                    <span class="user">Email</span>
                </div>
                <div class="inputBox">
                    <input type="password" 
                    v-model="password" required="required">
                    <span>Password</span>
                </div>
                <button 
                    @click="register" 
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




<style lang="scss" scoped>

</style>