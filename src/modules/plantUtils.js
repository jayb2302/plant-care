import { onMounted } from 'vue';
import { getPlantsData, plants } from './plants'; // Import the function to fetch plant data
import { useNextWateringDates } from './nextWatering'; // Import the useNextWateringDates function from nextWatering.js


onMounted(() => {
    getPlantsData();
});

export function usePlantsData() {
    const { nextWateringDates } = useNextWateringDates(plants);

    return {
        nextWateringDates,
    };
}