<template>
    <div>
        <TabGroup w-screen as="navbar" v-model:selected="selectedTab" v-if="isLoggedIn">
            <TabList class="flex space-x-4 justify-evenly ">
                <Tab class="cursor-pointer">My Schedule</Tab>
                <Tab class="cursor-pointer">My Sites</Tab>
            
                <div class="search ">
                    <input name="searchbar" type="text" class="search__input w-80" placeholder="Search Your Plant Home">
                    <button class="search__button bg-black">
                    </button>
                </div>
            <!-- User Profile Dropdown -->
                <div class="ml-4 flex items-center md:ml-6">
                    <div>
                        <button class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" @click="toggleDropdown">
                            <span class="absolute -inset-1.5" />
                            <span class="sr-only">Open user menu</span>
                            <img class="h-8 w-8 rounded-full" src="" alt="" />
                        </button>
                    </div>
                    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                        <ul v-if="isDropdownOpen" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" @click.stop>
                        <p>{{ users.length > 0 ? users[0].username : 'Loading...' }}</p>
                        <li @click="handleSignOut">Sign Out</li>
                        </ul>
                    </transition>
                </div>
            </TabList>
       
            <TabPanels>
                <TabPanel>
                    <Schedule/>
                </TabPanel>
                <TabPanel>
                    <MySitesView/>
                </TabPanel>
            </TabPanels>
        </TabGroup>
        <div v-else class="w-screen flex-col justify-center">
            <p class="p-tag text-center">Please log in to access this page.</p>
            <button id="btn-in" class="w-screen" @click="showSignInModal">Log In</button>
                
        </div>
    </div>
    <Teleport to="body">
        <transition 
            v-motion
            :initial="{
            opacity: 0,
            y: 0,
            }"
            :variants="{ custom: { scale: 3 } }"
            :enter="{
            opacity: 1,
            y: 0,
            }" 
            
        >
            <div class="modal" v-if="showModal">
            <div id="modal" class="modal-content"> 
                <div id="background" class="background">
                <div class="leaf leaf1"></div>
                <div class="leaf leaf2"></div>
                <div class="leaf leaf3"></div>
                <div class="leaf leaf4"></div>
                <div class="leaf leaf5"></div>
                <div class="leaf leaf6"></div>
                </div>
            <!-- Render SignIn.vue component here -->
                <SignIn @close="closeModal" />
                <img id="leafImage" src="" alt="">
            </div>
            </div>
        
        </transition>
    </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { users, getUsersData } from '../modules/users';
import { watch } from 'vue';
import Schedule from './ScheduleView.vue';
import MySitesView from './MySitesView.vue';
import SignIn from '../components/SignIn.vue';



const selectedTab = ref(0);
const isLoggedIn = ref(false);

const isDropdownOpen = ref(false);
const showModal = ref(false); // This variable controls the modal visibility

const showSignInModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const toggleDropdown = (event) => {
  event.stopPropagation();
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log('Signed out successfully');
      isLoggedIn.value = false;
      
    })
    .catch((error) => {
      console.log(error.code);
    });
};

const closeDropdown = (event) => {
  if (!event.target.closest(".relative.ml-3")) {
    isDropdownOpen.value = false;
  }
};

let auth;
onMounted(async () => {
  auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;

    // Call getUsersData to retrieve user data when needed
    if (user) {
      getUsersData();
    }
  });

  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});

watch(isLoggedIn, (newIsLoggedIn) => {
  if (newIsLoggedIn) {
    closeModal();
  }
});
</script>




<style lang="scss" scoped>
    nav{
        visibility: hidden;
    }
</style>