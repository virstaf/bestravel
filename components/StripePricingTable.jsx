import React from "react";

export const StripePricingTable = () => {
  return (
    <div className="stripe-pricing-table w-full max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      <stripe-pricing-table
        pricing-table-id="prctbl_1Rfn9PLAxh7V2BxLakzQf82D"
        publishable-key="pk_test_51L35V5LAxh7V2BxLZSpOWIzUPoIGJczEdHHy2zEHoyhVNLXSFHMJXeU6Kp4mJOUPw8rEpFZn7IVUEOnWkM9MsnLC00RR0kdSTy"
      ></stripe-pricing-table>
    </div>
  );
};
