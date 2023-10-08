// plantapi.js
export async function fetchPlants() {
    try {
      const baseUrl = "https://perenual.com/api/species-list?key=sk-zJcM64f8ab371b9ff1929";
      let totalPages = 1;
      const allData = [];
  
      while (totalPages < 10) {
        const url = `${baseUrl}&page=${totalPages}`;
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error(`Failed to fetch page ${totalPages}`);
        }
  
        const data = await response.json();
  
        if (data.last_page) {
          totalPages = data.last_page;
        }
  
        // console.log(`Fetching page ${totalPages}, last_page: ${data.last_page}`);
        allData.push(data.data);
  
        if (totalPages === data.last_page) {
          break;
        }
  
        totalPages++;
      }
  
      return allData.flat();
    } catch (error) {
      console.error(`Error fetching plants: ${error.message}`);
      throw error;
    }
  }
  