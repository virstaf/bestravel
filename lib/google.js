"use server";

import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client();

export const autoCompletePlaces = async (input) => {
  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: process.env.GOOGLE_PLACES_API_KEY,
      },
    });
    return response.data.predictions;
  } catch (error) {
    console.error("Error fetching autocomplete places:", error);
    throw error;
  }
};

// export { autoCompletePlaces };
