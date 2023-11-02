import './assets/main.css'
import './firebase'
import './index.css'

import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";


const app = createApp(App)

app.use(router) 
app.use(MotionPlugin)
app.use(Toast) 
app.mount('#app')
