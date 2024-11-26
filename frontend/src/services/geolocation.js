import axios from "axios";

const ORS_API_KEY = process.env.REACT_APP_ORS_API_KEY;

/**
 * Fetch distances between origins and destinations using OpenRouteService.
 * @param {string[]} locations - Array of coordinates in the format [longitude, latitude].
 * @returns {Promise<Object>} - Distance and travel time matrix.
 */
export const getDistanceMatrixORS = async (locations) => {
  const endpoint = "https://api.openrouteservice.org/v2/matrix/driving-car";
  const params = {
    locations,
    metrics: ["distance", "duration"],
  };

  try {
    const response = await axios.post(endpoint, params, {
      headers: { Authorization: ORS_API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching distance matrix:", error);
    throw error;
  }
};


// const testORS = async () => {
//     const locations = [
//       [-122.4194, 37.7749], // San Francisco
//       [-118.2437, 34.0522], // Los Angeles
//     ];
//     const result = await getDistanceMatrixORS(locations);
//     console.log(result);
//   };
  
//   testORS();