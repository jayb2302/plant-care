// nextWatering.js


export function calculateNextWateringDate(lastWateredDate, waterFrequency) {
  if (waterFrequency === null) {
      console.warn('Water frequency is null for the plant, consider adding a default value.');
      return null; // Handle null water frequency appropriately, e.g., return null or a default value.
    }

  const lastWatered = new Date(lastWateredDate);
  const currentDate = new Date();
  // Parse the 'waterFrequency' string to extract the number of days (if present)
  const match = waterFrequency.match(/(\d+) days/);
  
  if (match) {
      // eslint-disable-next-line no-unused-vars
      const [_, days] = match;
      const nextWateringDate = new Date(lastWatered.getTime() + days * 24 * 60 * 60 * 1000);
      const timeDiff = nextWateringDate - currentDate;
      return { date: nextWateringDate, daysUntilWatering: Math.ceil(timeDiff / (24 * 60 * 60 * 1000)) };
  } else if (waterFrequency.includes('-')) {
      // Handle cases like "3-4 days" or other variations
      const parts = waterFrequency.split('-');
      const minDays = parseInt(parts[0]);
      const maxDays = parseInt(parts[1]);
      // Choose to use an average or any logic that makes sense for your application.
      const avgDays = (minDays + maxDays) / 2;
      const nextWateringDate = new Date(lastWatered.getTime() + avgDays * 24 * 60 * 60 * 1000);

      // Calculate the difference in milliseconds between the next watering date and the current date
      const timeDiff = nextWateringDate - currentDate;

      if (timeDiff > 0) {
          // Calculate the number of days until the next watering date
          return { date: nextWateringDate, daysUntilWatering: Math.ceil(timeDiff / (24 * 60 * 60 * 1000)) };
      }
  } else {
      console.error('Unrecognized waterFrequency format:', waterFrequency);
      return null;
  }
}