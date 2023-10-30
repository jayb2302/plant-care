
const API_KEY = 'sk-62D6653cf8bcd11af2744'

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
// Function to get a list of plants from the database
// It takes an optional parameter object which can contain a query string and a page number
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