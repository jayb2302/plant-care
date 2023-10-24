// plantapi.js
// export async function fetchPlants() {
//   try {
//     const baseUrl = "https://perenual.com/api/species-list?key=sk-DFLt652e3d021aa6e2511";
//     let totalPages = 1;
//     const allData = [];

//     while (totalPages < 10) {
//       const url = `${baseUrl}&page=${totalPages}`;
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error(`Failed to fetch page ${totalPages}`);
//       }

//       const data = await response.json();

//       if (data.last_page) {
//         totalPages = data.last_page;
//       }

//       // Fetch details for each plant
//       for (const plant of data.data) {
//         const detailsResponse = await fetch(`https://perenual.com/api/species/details/${plant.id}?key=sk-DFLt652e3d021aa6e2511

//         `);
//         if (!detailsResponse.ok) {
//           throw new Error(`Failed to fetch details for plant ${plant.id}`);
//         }
//         const detailsData = await detailsResponse.json();
//         // Add the details to the plant object
//         plant.details = detailsData;
//       }

//       allData.push(data.data);

//       if (totalPages === data.last_page) {
//         break;
//       }

//       totalPages++;
//     }

//     return allData.flat();
//   } catch (error) {
//     console.error(`Error fetching plants: ${error.message}`);
//     throw error;
//   }
// }



const API_KEY = 'sk-DFLt652e3d021aa6e2511'

export const getPlantList = async (params = {}) => {
    const uri = new URL('https://perenual.com/api/species-list')
    uri.searchParams.append('key', API_KEY)

    // Set query parameters
    params.q && uri.searchParams.append('q', params.q)
    params.page && uri.searchParams.append('page', params.page)

    try {
        const response = await fetch(uri.toString())

        if (!response.ok)
            throw new Error('Failed searching plants')

        const data = await response.json()

        // Return full response w/ pagination info if page param is set else just the list
        if (params.page)
            return data
        else
            return data.data
    } catch (e) {
        throw new Error('Failed searching plants')
    }
}

export const getPlantById = async (id) => {
  if (!id)
      throw new Error('Missing parameter: id')

  const uri = new URL(`https://perenual.com/api/species/details/${id}`)
  uri.searchParams.append('key', API_KEY)

  try {
      const response = await fetch(uri.toString())

      if (!response.ok)
          throw new Error('Failed fetching plant')

      const data = await response.json()

      return data
  } catch (e) {
      throw new Error('Failed fetching plant')
  }
}