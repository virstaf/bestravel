import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import SubscriptionStatus from "./subscription-status";
import Pricing from "./ui/pricing";
import EditBillingDetails from "./ui/EditBillingDetails";

const SubscriptionSettings = () => {
  return (
    <div className="space-y-6">
      <Card className={"bg-white"}>
        <CardHeader>
          <CardTitle>Your Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <SubscriptionStatus />
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Manage Plan</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <UpgradeSubscription /> */}
          <Pricing />
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <EditBillingDetails />
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionSettings;
