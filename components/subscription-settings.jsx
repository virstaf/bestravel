import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import SubscriptionStatus from "./subscription-status";
import BillingHistory from "./billing-history";
import UpgradeSubscription from "./upgrade-subscription";
import Pricing from "./ui/pricing";

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

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <BillingHistory />
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionSettings;
