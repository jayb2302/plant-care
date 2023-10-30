<template>
  <div v-if="isLoggedIn" class="">
    <div class="admin w-full lg:flex flex  justify-end pr-5">
    <!--  // --- UserProfile --- // -->
      <!-- <div class="search ">
          <input name="searchbar" type="text" class="search__input " placeholder="Search...">
          <button class="search__button bg-black">
          </button>
      </div> -->
      <!--  // --- UserProfile --- // -->
      <div class="admin-profile">
          <div class=" ">
              <button class="user-btn relative flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" @click="toggleDropdown">
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                  <img class="h-14 w-14 rounded-full bg-none  " src="../components/icons/userking.svg" alt="" />
              </button>
          </div>
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <ul v-if="isDropdownOpen" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" @click.stop>
              <p>{{ users.length > 0 ? users[0].username : 'Loading...' }}</p>
              <li @click="handleSignOut">Sign Out</li>
              </ul>
          </transition>
      </div>
    </div>
    <header class="shadow m-0">
      <div class="header-container lg:mb-3  lg:flex lg:justify-between max-w-6xl  pt-5  lg:px-2">
        <div class="btn-wrapper flex  lg:gap-5  gap-2   justify-evenly">
    
          <button class="buttonadmin z-10" @click="showAddPlantModal = true">
            <img class="leaf" src="../assets/img/twoleaves.svg" style=" height: 40px;" alt="Two leaf icon" />
            Add Plant
            <div class="buttonadmin__horizontal"></div>
            <div class="buttonadmin__vertical"></div>
          </button>
          <button class="buttonadmin z-10"  @click="showAddSiteModal = true">
            Add Site
            <div class="buttonadmin__horizontal"></div>
            <div class="buttonadmin__vertical"></div>
          </button>
        </div>
      </div>
      <div id="modal-container">
          <Teleport to="body">
            <div class="modal-background dark:bg-slate-500">
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
              >
                <AddPlantModal @close="handleModalClose" class="two" v-if="showAddPlantModal" />
              </transition>
            </div>
          </Teleport>

          <Teleport to="body">
            <div class="modal-background">
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
              >
                <AddSiteModal :onConfirm="handleConfirm" @close="handleModalClose" class="two bg-slate-400" v-if="showAddSiteModal" />
              </transition>
            </div>
          </Teleport>
      </div>
    </header>
    <TabGroup class="tabgroup" as="navbar" v-model="activeTab" v-if="isLoggedIn">
        <TabList class="flex space-x-4 justify-center lg:justify-start  ">
          <Tab  class="cursor-pointer pl-5 pr-5" :class="{ 'active': isMyScheduleTabActive }">
            <h2>My Schedule</h2>
          </Tab>
          <Tab  class="cursor-pointer" :class="{ 'active': isMySitesTabActive }">
            <h2>My Sites</h2> 
          </Tab>
      
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
                <SignInModal @close="closeModal" />
                <img id="leafImage" src="" alt="">
            </div>
            </div>
        
        </transition>
    </Teleport>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { users, getUsersData } from '../modules/users';
import { watch } from 'vue';
import Schedule from './ScheduleView.vue';
import MySitesView from '../views/MySitesView.vue';
import AddPlantModal from '../components/AddPlantModal.vue';
import AddSiteModal from '../components/AddSiteModal.vue';
import SignInModal from '../components/SignInModal.vue';






const isLoggedIn = ref(false);

const isDropdownOpen = ref(false);
const showModal = ref(false); // This variable controls the modal visibility
const showAddPlantModal = ref(false);
const showAddSiteModal = ref(false);

const activeTab = ref('my-schedule');

const isMyScheduleTabActive = computed(() => {
  return activeTab.value === 'my-schedule';
});

const isMySitesTabActive = computed(() => {
  return activeTab.value === 'mysites';
});

const showSignInModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleConfirm = () => {
  showAddSiteModal.value = false;
};

const handleModalClose = () => {
  showAddPlantModal.value = false;
  showAddSiteModal.value = false;
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
    h2 {
        font-family: $title-font;
        font-size: 1.1rem;
      }
    .active {
        border-bottom: 2px solid #000;
        background-color: $focus;
        color: #000;
      }
    
</style>