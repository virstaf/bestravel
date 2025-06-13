import Amadeus from "amadeus";

// const getConfig = (key) => {
//   if (!process.env[key]) {
//     throw new Error(`Environment variable ${key} is not set`);
//   }
//   return process.env[key];
// };

const amadeusApi = process.env.NEXT_PUBLIC_AMADEUS_API_KEY;
const amadeusSecret = process.env.NEXT_PUBLIC_AMADEUS_API_SECRET;

if (!amadeusApi || !amadeusSecret) {
  return console.error(
    "Amadeus API credentials are not set in environment variables."
  );
}

console.log("Amadeus API Key:", amadeusApi);
console.log("Amadeus API Secret:", amadeusSecret);

const amadeus = new Amadeus({
  clientId: amadeusApi,
  clientSecret: amadeusSecret,
});

export default amadeus;
