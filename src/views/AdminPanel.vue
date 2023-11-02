<template>
  <div v-if="isLoggedIn" class="">
    <div class="admin w-full  flex  justify-evenly">
      <!--  // --- UserSearch --- // -->
      <!-- <div class="search ">
          <input name="searchbar" type="text" class="search__input " placeholder="Search...">
          <button class="search__button bg-black">
          </button>
      </div> -->
        <div class="flex-col md:flex-row flex gap-5 z-40 md:pt-5">
          <button class="buttonadmin z-10" @click="showAddPlantModal = true">
            <img class="leaf" src="../assets/img/twoleaves.svg" style=" height: 40px;" alt="Two leaf icon" />
            Add Plant
            <div class="buttonadmin__horizontal"></div>
            <div class="buttonadmin__vertical"></div>
          </button>
          <button class="buttonadmin z-10" @click="showAddSiteModal = true">
            <img class="siteicon" src="../components/icons/plantRoom.svg" style=" height: 40px;" alt="One leaf icon" />
            Add Site
            <div class="buttonadmin__horizontal"></div>
            <div class="buttonadmin__vertical"></div>
          </button>
        </div>
      <!--  // --- UserProfile --- // -->
      <div class="user-profile absolute right-2 top-7 md:top-3">
        <div class=" ">
          <button
            class="user-btn  flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            @click="toggleDropdown">
            <span class="absolute -inset-1.5" />
            <span class="sr-only">Open user menu</span>
            <img class=" sticky top-10 h-14 w-14 rounded-full bg-none  " src="../components/icons/userking.svg" alt="" />
          </button>
        </div>
        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <ul v-if="isDropdownOpen"
            class="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md cardbg py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            @click.stop>
            <p> Hello {{ currentUser && currentUser.username ? currentUser.username : 'Loading...' }}</p>

            <li @click="handleSignOut">Sign Out</li>
          </ul>
        </transition>
      </div>
    </div>

    <header class="shadow m-0 ">
      
      <div class="modal-container mx-10">
        <Teleport to="body">
          <div class="modal-background">
            <transition v-motion 
              :initial="{ opacity: 0, y: 0, }" 
              :variants="{ custom: { scale: 2 } }" 
              :enter="{opacity: 1,y: 0, }">
              <AddPlantModal :userId="userUid" @close="handleModalClose"  v-if="showAddPlantModal" />
            </transition>
          </div>
        </Teleport>

        <Teleport to="body">
          <div class="modal-background">
            <transition v-motion :initial="{ opacity: 0, y: 0, }" 
              :variants="{ custom: { scale: 2 } }" 
              :enter="{ opacity: 1, y: 0, }">
                <AddSiteModal 
                  :onConfirm="handleConfirm" 
                  @close="handleModalClose" 
                  class="two"
                  v-if="showAddSiteModal" />
            </transition>
          </div>
        </Teleport>
      </div>
    </header>
    <TabGroup class="tabgroup" as="navbar" v-if="isLoggedIn">
      <TabList class="flex sticky top-2 z-40 md:-mt-3 space-x-4 x-3 py-1 justify-center gradient lg:justify-start">
        <Tab class="cursor-pointer" v-slot="{ selected }">
        <h2 class="ml-2 px-2" :class="{ 'active': selected,'nonActive': !selected }" >
          My Schedule
        </h2>
      </Tab>
      <Tab class="cursor-pointer"  v-slot="{ selected }">
        <h2 class="px-2" :class="{ 'active': selected,'nonActive': !selected }">
          My Sites
        </h2>
      </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Schedule />
        </TabPanel>
        <TabPanel >
          <MySitesView />
        </TabPanel>
      </TabPanels>
    </TabGroup>


    <div v-else class="flex-col  justify-center">
      <p class="p-tag text-center">Please log in to access this page.</p>
      <button id="btn-in" class="w-screen" @click="showSignInModal">Log In</button>

    <Teleport to="body">
      <transition v-motion :initial="{
              opacity: 0,
              y: 0,
            }" :variants="{ custom: { scale: 3 } }" :enter="{
        opacity: 1,
        y: 0,
      }">
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
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getCurrentUser } from '../auth.js';
import { getUsersData } from '../modules/users';
import { watch } from 'vue';
import router from '../router';
import Schedule from './ScheduleView.vue';
import MySitesView from '../views/MySitesView.vue';
import AddPlantModal from '../components/AddPlantModal.vue';
import AddSiteModal from '../components/AddSiteModal.vue';
import SignInModal from '../components/SignInModal.vue';

const { userUid } = getAuth();

const userId = ref(null);
const isLoggedIn = ref(false);
const isDropdownOpen = ref(false);
const showModal = ref(false);
const showAddPlantModal = ref(false);
const showAddSiteModal = ref(false);
const currentUser = ref(null);

const auth = getAuth();

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
      router.push('/');
    })
    .catch((error) => {
      console.error('Sign-out error:', error);
    });
};

const closeDropdown = (event) => {
  if (!event.target.closest(".relative.ml-3")) {
    isDropdownOpen.value = false;
  }
};

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});

onMounted(async () => {
  try {
    // Fetch user data
    const user = await getCurrentUser();
    userId.value = user.uid;
    const userData = await getUsersData(userId.value);
    currentUser.value = userData;
  } catch (error) {
    // Handle the error as needed, e.g., log it or show an error message.
    console.error("Error while fetching user data:", error);
  }

  // Observe the authentication state
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;

    if (user) {
      userId.value = user.uid;
      getUsersData(user.uid).then((userData) => {
        currentUser.value = userData;
      });
    }
  });

  document.addEventListener("click", closeDropdown);
});

watch(isLoggedIn, (newIsLoggedIn) => {
  if (newIsLoggedIn) {
    closeModal();
  }
});
</script>







<style lang="scss" scoped>
nav {
  visibility: hidden;
}

h2 {
  font-family: $title-font;
  font-size: 1.1rem;
  @media  screen and (max-width: 768px) {
    font-size: 0.8rem;
    
  }
  
}

.active {
  background-color: $focus;
  color: $white;
  border-radius: 10px;
  
}

.nonActive {
  background-color: $white;
  color: $black;
  border-radius: 10px;
  
}
</style>