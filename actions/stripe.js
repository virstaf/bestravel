"use server";

import { stripe } from "@/lib/stripe";

export const subscribeAction = async (user, priceId) => {
  // console.log("Subscribing user:", user, "with priceId:", priceId);
  const { url } = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: user?.id,
      email: user?.email,
    },
    customer_email: user?.email,
    success_url: `${process.env.NEXT_PUBLIC_BASEURL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASEURL}`,
  });
  return url;
};
