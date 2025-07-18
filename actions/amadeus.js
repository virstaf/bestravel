"use server";

import Amadeus from "amadeus";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const amadeus = new Amadeus({
  clientId: process.env.NEXT_PUBLIC_AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});

export async function searchHotelLocations(query) {
  try {
    const { data } = await amadeus.referenceData.locations.get({
      keyword: query,
      subType: "HOTEL,CITY",
      page: { limit: 5 }, // Return top 5 results
    });

    return data.map((location) => ({
      id: location.id,
      name: location.name,
      iataCode: location.iataCode,
      type: location.subType,
    }));
  } catch (error) {
    console.error("Auto-complete error:", error);
    return [];
  }
}

// Flight Search Action
export async function searchFlights(formData) {
  const rawData = {
    origin: formData.get("origin"),
    destination: formData.get("destination"),
    date: formData.get("date"),
    adults: formData.get("adults") || "1",
  };

  try {
    const { data } = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: rawData.origin,
      destinationLocationCode: rawData.destination,
      departureDate: rawData.date,
      adults: rawData.adults,
    });

    revalidatePath("/flights");
    return { flights: data, error: null };
  } catch (error) {
    return { flights: null, error: error.message };
  }
}

// Hotel Search Action
export async function searchHotels(formData) {
  const rawData = {
    city: formData.get("city"),
    checkIn: formData.get("checkIn"),
    checkOut: formData.get("checkOut"),
    guests: formData.get("guests") || "1",
  };

  try {
    const { data } = await amadeus.shopping.hotelOffers.get({
      cityCode: rawData.city,
      checkInDate: rawData.checkIn,
      checkOutDate: rawData.checkOut,
      adults: rawData.guests,
    });

    revalidatePath("/hotels");
    return { hotels: data, error: null };
  } catch (error) {
    return { hotels: null, error: error.message };
  }
}
