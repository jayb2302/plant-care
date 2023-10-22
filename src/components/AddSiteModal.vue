<template>
    <div class="modal " @click="closeModal">
      <!-- Modal content -->
      <div class="modal-content flex flex-col  " @click.stop>
        <h2 class="h2 text-3xl text-center">Select a Site</h2>
            <button class=" w-40" @click="$emit('close')">
                <svg class="close-btn" xmlns="http://www.w3.org/2000/svg" width="17.828" height="17.828">
                    <path d="m2.828 17.828 6.086-6.086L15 17.828 17.828 15l-6.086-6.086 6.086-6.086L15 0 8.914 6.086 2.828 0 0 2.828l6.085 6.086L0 15l2.828 2.828z"/>
                </svg>
            </button>
        <div class="site-list flex wrap gap-5 pt-3 pb-3">
          <!-- Render the list of sites with thumbnails and headings -->
            <div
                class="site-card flex flex-col m-1 border-2 border-gray-200"
                v-for="site in sites"
                :key="site.id"
                @click="selectSite(site)"
                :class="{ selected: site === selectedSite }"
            >
                <div class="flex  relative flex-col justify-center items-center gap-3 ">
                    <img class="" :src="site.thumbnail" alt="Site Thumbnail" />
                    <h3 class="p-0 absolute">{{ site.name }}</h3>
                </div>
            </div>
        </div>

        <div class="flex flex-col justify-center items-center gap-1 ">
            <button class="buttonadmin w-40" @click="confirmSelection">
                Confirm
                <div class="buttonadmin__horizontal"></div>
                <div class="buttonadmin__vertical"></div>
            </button>
        </div>

        <div v-if="showLightConditionModal" class="modal">
            <div class="modal-content flex flex-col ">
               
               
                <div class="div flex justify-center ">
                
                    <h2 class="h2">Select Light Condition</h2>
                </div>
                    
                <div class="light-content flex justify-evenly">
                 <button class="" @click="$emit('close')">
                        <svg class="back-btn" xmlns="http://www.w3.org/2000/svg" width="24.703" height="24.928">
                            <path d="M1.056 21.928c0-6.531 5.661-9.034 10.018-9.375V18.1L22.7 9.044 11.073 0v4.836a10.5 10.5 0 0 0-7.344 3.352C-.618 12.946-.008 21 .076 21.928z"/>
                        </svg> 
                    </button>
                    <button class="light-btn flex flex-col items-center" @click="setLightCondition('Full-shade')" :class="{ selected: selectedButton === 'Full-shade' }">
                        <img src="../components/icons/fullShade.svg" style="width: 60px; height: 60px;" alt="Full shade icons">
                        Full-shade
                    </button>
                    <button class="light-btn flex flex-col items-center" @click="setLightCondition('Part-shade')" :class="{ selected: selectedButton === 'Part-shade' }">
                        <img src="../components/icons/partShade.svg" style="width: 60px; height: 60px;" alt="Part shade icon">
                        Part-shade
                    </button>
                    <button class="light-btn flex flex-col items-center" @click="setLightCondition('Part-sun')" :class="{ selected: selectedButton === 'Part-sun' }">
                        <img src="../components/icons/partSun.svg" style="width: 60px; height: 60px;" alt="Part sun icon">
                        Part-sun
                    </button>
                    <button class="light-btn flex flex-col items-center" @click="setLightCondition('Full-sun')" :class="{ selected: selectedButton === 'Full-sun' }">
                        <img src="../components/icons/fullSun.svg" style="width: 60px; height: 60px;" alt="Full sun icon">
                        Full-sun
                    </button>
                </div> 
               
                <div class="flex justify-center items-center mt-5">
                
                    <button class="buttonadmin w-40"  @click="confirmLightCondition">
                        Confirm
                        <div class="buttonadmin__horizontal"></div>
                        <div class="buttonadmin__vertical"></div>
                    </button>
                
                </div>
               
            </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firebase configuration

import officeThumbnail from '@/assets/img/office.jpeg';
import bedroomThumbnail from '@/assets/img/bedroom.jpeg';
import bathroomThumbnail from '@/assets/img/bathroom.jpeg';
import kitchenThumbnail from '@/assets/img/kitchen.jpeg';
import terraceThumbnail from '@/assets/img/terrace.jpeg';
import hallThumbnail from '@/assets/img/hall.jpeg';
import porchThumbnail from '@/assets/img/porch.jpeg';
import balconyThumbnail from '@/assets/img/balcony.jpg';
import gardenThumbnail from '@/assets/img/garden.jpeg';
import livingroomThumbnail from '@/assets/img/livingroom.jpeg';

const showLightConditionModal = ref(false);
const lightCondition = ref(null);
const selectedSite = ref(null);


const addSiteToFirestore = async (site) => {
    try {
        const sitesCollection = collection(db, 'sites'); // Replace 'sites' with your Firestore collection name
        await addDoc(sitesCollection, { ...site, lightCondition: lightCondition.value });
        console.log('Site added to Firestore');
    } catch (error) {
        console.error('Error adding site to Firestore:', error);
    }
};
  

const { onConfirm } = defineProps(['onConfirm']);

// Premade list of sites with thumbnails

const sites = ref([
    { name: 'Foreroom', thumbnail: livingroomThumbnail },
    { name: 'Bedroom', thumbnail: bedroomThumbnail },
    { name: 'Bathroom', thumbnail: bathroomThumbnail },
    { name: 'Kitchen', thumbnail: kitchenThumbnail },
    { name: 'Office', thumbnail: officeThumbnail},
    { name: 'Terrace', thumbnail: terraceThumbnail },
    { name: 'Hallway', thumbnail: hallThumbnail },
    { name: 'Porch', thumbnail: porchThumbnail },
    { name: 'Balcony', thumbnail: balconyThumbnail },
    { name: 'Garden', thumbnail: gardenThumbnail },
]);

const selectSite = (site) => {
    // Set the selected site
    selectedSite.value = site;
};

const confirmSelection = () => {
  if (selectedSite.value) {
    // Show the light condition modal
    showLightConditionModal.value = true;
  } else {
    alert('Please select a site before confirming.');
  }
};

const selectedButton = ref(null);
const isButtonSelected = ref(false);

const setLightCondition = (condition) => {
    selectedButton.value = condition;
    lightCondition.value = condition;
};

const confirmLightCondition = () => {
  if (lightCondition.value) {
    // Add the selected site with the selected light condition to Firestore
    addSiteToFirestore(selectedSite.value);
    // Emit the selected site to the parent component using the provided onConfirm prop
    onConfirm(selectedSite.value);
    // Close the light condition modal
    showLightConditionModal.value = false;
    isButtonSelected.value = !isButtonSelected.value;
  } else {
    alert('Please select a light condition before confirming.');
  }
  
};

  const closeModal = () => {
    // Optionally, you can close the modal when clicking outside of it
    // You can add this functionality if needed
  };
  
  </script>
  
<style scoped lang="scss">
  /* Add styling for the modal and its content */
.modal {
    width: 100%;  
      
    .light-content {
        background-color: rgba(255, 255, 255, 0.748);
        padding: 5% 0;
        color: $heading-color;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        .light-btn {
            
            border: none;
            &:hover {
                cursor: pointer;
                
            }
        }
    }
    .modal-content {   
        background-position-y: 50%;
        width: clamp(300px, 50%, 800px);
        .h2{
            color: $white;
            font-family: $heading-font;
            font-weight: 400;
            font-size: 5rem;
            text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5), 0 0 1em rgba(0, 0, 0, 0.5);
        }
        .site-list{
            margin-top: 2%;
            flex-wrap: wrap;
            justify-content: center;
            background-color: rgba(255, 255, 255, 0.395);
            padding: 2% 0;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;            
            .site-card{
                width: calc(100% / 6 - 1%);
                background-color: $heading-color;
                font-family: $title-font;
                font-weight: 900;
                letter-spacing: 2px;
                font-size: 1.8em;
                color: $white;
                box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
               
                img {
                    width: 350px;
                    height: 130px;
                    filter: opacity(0.6);
                    &:hover{
                        filter: opacity(1);
                        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;                        
                        scale: 1.1 ;
                        transition: all 0.5s ease-in-out;
                        
                    }
                }
                h3{
                    bottom: 10%;
                    width: max-content;
                    color: $white;
                    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5), 0 0 1em rgba(0, 0, 0, 0.5),  0 0 1em rgba(0, 0, 0, 0.5) , 0 0 1em rgba(0, 0, 0, 0.5);
                   
            
                }
                &:hover {
                    cursor: pointer;
                    
                    
                }
            }

        }
    }
    .back-btn{
    transform: scalex(-1) scale(1.3);
    position: absolute;
    left: 5%;
    top: 25%;
    fill: $darkbeige;
    &:hover{
        transform: scaleX(-1) scale(1.9);
        transition: all 0.5s ease-in-out;
        fill: $backhover;
    }
}
}

  .selected {
    border: 2px solid $darkPink;
    background-color: $mutedPink;
    color: $heading-color; 
    font-weight: bold;
    
    }
 
</style>
  