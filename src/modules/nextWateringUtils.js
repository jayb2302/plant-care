
import { ref } from 'vue';
import { getPlantsData, plants } from './plants';
import { calculateNextWateringDate } from './nextWatering'; 
export function useNextWateringDates() {
    const nextWateringDates = ref([]);
  
    
      getPlantsData();
  
      nextWateringDates.value = plants.value.map((plant) => {
        return calculateNextWateringDate(plant.last_watered, plant.water_frequency);
      });
    
  
    return {
      nextWateringDates,
    };
}