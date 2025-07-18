import Amadeus from "amadeus";

export const amadeus = new Amadeus({
  clientId: process.env.NEXT_PUBLIC_AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});
