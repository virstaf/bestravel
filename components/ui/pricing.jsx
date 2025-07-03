import React from "react";
import { plans } from "@/lib/data";
import { getUser } from "@/lib/supabase/server";

const Pricing = async () => {
  const user = await getUser();
  const userEmail = user?.email;

  // console.log("user", user);

  return (
    <>
      <div className=""></div>
      <div>
        {/* <h1>Pricing</h1>
        <ul>
          {plans.map((plan) => (
            <li key={plan.name}>
              <h2>{plan.name}</h2>
              <p>{plan.price}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul> */}
      </div>
    </>
  );
};

export default Pricing;
