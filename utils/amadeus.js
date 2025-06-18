// utils/amadeus.js
import amadeus from "@/lib/amadeus";

export async function getHotelAutocomplete(query, countryCode = "GH") {
  try {
    const response = await amadeus.referenceData.locations.hotel.get({
      keyword: query,
      subType: "HOTEL_LEISURE",
      countryCode: countryCode,
      lang: "EN",
      max: 20,
    });
    return response.data;
  } catch (error) {
    console.error("Amadeus API Error:", error.response?.data || error.message);
    return [];
  }
}
