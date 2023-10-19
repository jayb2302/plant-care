<template>
  <div class="admin-home-container min-h-full">
    <Disclosure as="nav" class="bg-gray-700" v-slot="{ open }">
    <!-- Navbar Container-->
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex  h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="{ name: item.routeName }"
                  :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                  :aria-current="item.current ? 'page' : undefined"
                >
                  {{ item.name }}
                </router-link>              
   <!-- <a v-for="item in navigation" :key="item.name" :href="item.routeName" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a> -->
              </div>
            </div>
          </div>
      <!-- Search bar-->
          <div class="search">
            <input type="text" class="search__input" placeholder="Type your text">
            <button class="search__button">
                <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                    <g>
                        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                </svg>
            </button>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span class="absolute -inset-1.5" />
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <a :href="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
        </div>
        <div class="border-t border-gray-700 pb-3 pt-4">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">{{ user.name }}</div>
              <div class="text-sm font-medium leading-none text-gray-400">{{ user.email }}</div>
            </div>
            <button type="button" class="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="absolute -inset-1.5" />
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" :href="item.href" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">{{ item.name }}</DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <header class="bg-white shadow">
    <div class="mx-auto flex  gap-4 max-w-7xl mt-3 px-4 py-6 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold tracking-tight text-gray-900">My Home</h1>
    <button class="button text-slate-500" @click="showAddPlantModal = true">
      <img  class="leaf" src="../assets/img/twoleaves.svg" style="width: 40px; height: 40px;" alt="">
      Add Plant
      </button>
    <button class="button text-slate-500" @click="showAddSiteModal = true">Add Site</button>
  </div>
  
    <div id="modal-container">
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
            <AddPlantModal @close="handleModalClose" class="two bg-slate-400" v-if="showAddPlantModal" />
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
            <AddSiteModal
              :onConfirm="handleSiteSelection"
              @close="handleModalClose"
              class="two bg-slate-400"
              v-if="showAddSiteModal" />         
          </transition>
        </div>  
      </Teleport>
    </div>
 
  </header>
 
  <main class="bg-white shadow mt-3 rb">
      <div>
        Current Route: {{ $route.name }}
        
    </div>
      
  </main>
  
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import AddPlantModal from '@/components/AddPlantModal.vue'
import AddSiteModal from '@/components/AddSiteModal.vue'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firebase configuration

const selectedSite = ref(null);
const sites = ref([]);
const plants = ref([]);

// Fetch the list of sites from Firestore
onMounted(async () => {
  const sitesCollection = collection(db, 'sites'); // Replace 'sites' with your Firestore collection name
  const sitesQuery = query(sitesCollection);
  const sitesSnapshot = await getDocs(sitesQuery);
  sites.value = sitesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

const selectSite = (site) => {
  // Set the selected site
  selectedSite.value = site;

  // Fetch plants associated with the selected site
  fetchPlantsForSelectedSite(site.id);
};
console.log(selectSite)
const fetchPlantsForSelectedSite = async (siteId) => {
  const plantsCollection = collection(db, 'plants'); // Replace 'plants' with your Firestore collection name
  const plantsQuery = query(plantsCollection, where('siteId', '==', siteId));
  const plantsSnapshot = await getDocs(plantsQuery);
  plants.value = plantsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};


const showAddPlantModal = ref(false);
const showAddSiteModal = ref(false);

const handleSiteSelection = (site) => {
  // Do something with the selected site
  console.log(site);
};

const currentUser = ref(null)
const user = ref({
  name: '',
  email: '',
  imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/yuanql/icon-admin.png',
}).value;

const handleModalClose = () => {
  showAddPlantModal.value = false;
  showAddSiteModal.value = false;
};



const navigation = [
  { name: 'My Home', routeName: 'home', current: true },
  { name: 'Sites', routeName: 'mysitesview', current: false },
  // { name: 'My plants', routeName: 'my-plants', current: false },
  // { name: 'Schedule', routeName: 'schedule', current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
onMounted(async () => {
  try {
    await Promise.resolve()
    // newPlantName.value = await fetchPlants();
  } catch (error) {
    // Handle the error, e.g., show an error message to the user
    console.error(error);
  }
  const auth = getAuth()

  // Listen for changes in the user's sign-in state
  onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      // User is signed in
      currentUser.value = authUser
      user.name = authUser.displayName || ''
      user.email = authUser.email || ''
      
    } else {
      // No user is signed in
      currentUser.value = null
      user.name = ''
      user.email = ''
      user.imageUrl = ''
    }
  })
});




</script>

<style lang="scss">


.admin-home-container {
 
  height: 100vh;
  width: 95vw;
  
}
.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;

  &__input {
    font-family: inherit;
    font-size: inherit;
    background-color: #f4f2f2;
    border: none;
    color: #646464;
    padding: 0.7rem 1rem;
    border-radius: 30px;
    width: 20em;
    transition: all ease-in-out 0.5s;
    margin-right: -2rem;

    &:hover, &:focus {
      box-shadow: 0 0 1em #00000013;
    }

    &:focus {
      outline: none;
      background-color: #f0eeee;
    }

    &::-webkit-input-placeholder {
      font-weight: 100;
      color: #ccc;
    }

    &:focus + .search__button {
      background-color: #f0eeee;
    }
  }

  &__button {
    border: none;
    background-color: #f4f2f2;
    margin-top: 0.1em;

    &:hover {
      cursor: pointer;
    }
  }

  &__icon {
    height: 1.3em;
    width: 1.3em;
    fill: #b4b4b4;
  }
}

.selected {
  background-color: #007BFF; /* Set the background color */
  color: #FFF; /* Set the text color */
  font-weight: bold; /* Make the text bold, if desired */
  /* Add any other styling you prefer for the selected site */
}

.leaf {
  position: absolute;
  opacity: 0;
  top: -.3em;
  right: -.3em;
  height: 100%;
  transition: transform 300ms,opacity 150ms;

  &:hover {
    cursor: pointer;
  }
}

.button {
  position: relative;
  cursor: pointer;
  padding: 1em 1em;
  border: 0;
  border-radius: .5em;
  font-weight: bolder;
  transition: transform 150ms, box-shadow 150ms;
  box-shadow: 0 0 #999;
  background-color: #f1f1f1;
  color: #333;

  &:hover {
    transform: translate(-.2em, -.3em);
    box-shadow: 0em .3em #999;

    .leaf {
      opacity: 1;
      transform: translate(-.2em, -.2em);
    }
  }
}

</style>

