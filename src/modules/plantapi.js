// plantapi.js
export async function fetchPlants() {
  try {
    const baseUrl = "https://perenual.com/api/species-list?key=sk-DFLt652e3d021aa6e2511";
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

      // Fetch details for each plant
      for (const plant of data.data) {
        const detailsResponse = await fetch(`https://perenual.com/api/species/details/${plant.id}?key=sk-DFLt652e3d021aa6e2511

        `);
        if (!detailsResponse.ok) {
          throw new Error(`Failed to fetch details for plant ${plant.id}`);
        }
        const detailsData = await detailsResponse.json();
        // Add the details to the plant object
        plant.details = detailsData;
      }

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

  