export const pricingPlans = [
  // {
  //   name: "Bronze",
  //   link:
  //     process.env.NODE_ENV === "development"
  //       ? [
  //           "https://buy.stripe.com/test_cNifZietG2uE0Ju3XE2cg07",
  //           "https://buy.stripe.com/test_4gMaEY4T6c5edwgfGm2cg08",
  //         ]
  //       : [
  //           "https://buy.stripe.com/aFaaEY99m8T263O65M2cg01",
  //           "https://buy.stripe.com/dRm7sM5Xa8T20Juam22cg02",
  //         ],
  //   priceId:
  //     process.env.NODE_ENV === "development"
  //       ? ["price_1RfmqFLAxh7V2BxLt2hMnLTc", "price_1RfmqFLAxh7V2BxLyVlPoHlx"]
  //       : ["price_1Ri0zGLAxh7V2BxLvOBuowHX", "price_1Ri0zGLAxh7V2BxLVY42dlNB"],
  //   price: [0.1, 0.2],
  //   features: [
  //     "Up to 25% off Hotels",
  //     "1GB eSims Data Allowance (per booking)",
  //     "Flight Discounts",
  //     "Flash Sales",
  //     "Email Support",
  //   ],
  // },
  {
    name: "Silver",
    link:
      process.env.NODE_ENV === "development"
        ? [
            "https://buy.stripe.com/test_dRmbJ285ic5e63O2TA2cg03",
            "https://buy.stripe.com/test_5kQbJ20CQc5ebo879Q2cg04",
          ]
        : [
            "https://buy.stripe.com/test_dRmbJ285ic5e63O2TA2cg03",
            "https://buy.stripe.com/test_5kQbJ20CQc5ebo879Q2cg04",
          ],
    priceId:
      process.env.NODE_ENV === "development"
        ? ["price_1RfmqFLAxh7V2BxLt2hMnLTc", "price_1RfmqFLAxh7V2BxLyVlPoHlx"]
        : ["price_1Ri3nrLAxh7V2BxLaSLg2HDF", "price_1Ri3nrLAxh7V2BxLnCucUGmz"],
    price: [12.99, 139],
    features: [
      "Up to 25% off Hotels",
      "1GB eSims Data Allowance (per booking)",
      "Flight Discounts",
      "Flash Sales",
      "Email Support",
    ],
  },
  {
    name: "Gold",
    link:
      process.env.NODE_ENV === "development"
        ? [
            "https://buy.stripe.com/test_4gMfZi5Xa2uE0Juam22cg05",
            "https://buy.stripe.com/test_00w5kE71e8T29g0dye2cg06",
          ]
        : [
            "https://buy.stripe.com/test_4gMfZi5Xa2uE0Juam22cg05",
            "https://buy.stripe.com/test_00w5kE71e8T29g0dye2cg06",
          ],
    priceId:
      process.env.NODE_ENV === "development"
        ? ["price_1RfmyJLAxh7V2BxLzuV8fYM2", "price_1RfmzWLAxh7V2BxL48gZoRTQ"]
        : ["price_1Ri3noLAxh7V2BxLjSlgLIvB", "price_1Ri3noLAxh7V2BxL2gRf0aNp"],
    price: [25.99, 275],
    features: [
      "Up to 40% off Hotels",
      "5GB eSims Data Allowance (per booking)",
      "Flight Discounts",
      "Airport Lounge Access (2 access/year)",
      "24hrs early Flash Sales and Offers",
      "24/7 Support and Concierge Service",
    ],
  },
  {
    name: "Platinum",
    link:
      process.env.NODE_ENV === "development"
        ? [
            "https://buy.stripe.com/test_aFaaEY99m8T263O65M2cg01",
            "https://buy.stripe.com/test_dRm7sM5Xa8T20Juam22cg02",
          ]
        : [
            "https://buy.stripe.com/test_aFaaEY99m8T263O65M2cg01",
            "https://buy.stripe.com/test_dRm7sM5Xa8T20Juam22cg02",
          ],
    priceId:
      process.env.NODE_ENV === "development"
        ? ["price_1Rfn1yLAxh7V2BxLS5IiD8Gy", "price_1Rfn1yLAxh7V2BxL8bcMhPvL"]
        : ["price_1Ri3nkLAxh7V2BxLgZ9Flk3S", "price_1Ri3nkLAxh7V2BxLCCY72QFe"],
    price: [45, 499],
    features: [
      "Up to 50% off Plus access to selected luxury Hotels and Resorts",
      "10GB eSims Data Allowance (per booking)",
      "Flight Discounts",
      "Airport Lounge Access (5 access/year)",
      "48hrs early Flash Sales and Offers",
      "24/7 Support and Concierge Service",
      "2 Free lounge guest passes & upgrades",
    ],
  },
];

export const findPlanByPriceId = (priceId) => {
  for (const plan of pricingPlans) {
    let currentPriceId = plan.priceId[0];
    let currentPriceId2 = plan.priceId[1];

    if (currentPriceId === priceId || currentPriceId2 === priceId) {
      return plan.name;
    }
  }
  return "trial"; // Return trial if not found
};
