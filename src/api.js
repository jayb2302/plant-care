// src/api.js

import axios from 'axios';

const API_BASE_URL = 'YOUR_FIREBASE_CLOUD_FUNCTION_URL'; // Replace with the actual URL
export async function getSpeciesList() {
    const apiKey = 'sk-zJcM64f8ab371b9ff1929'; // Add your API key here
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(`${API_BASE_URL}/species-list?key=${apiKey}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
