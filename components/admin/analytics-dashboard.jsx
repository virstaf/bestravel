"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, UserPlus, UserMinus, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { getSubscriptionMetrics } from "@/actions/admin/analytics";
import { Loader2Icon } from "lucide-react";

export default function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const data = await getSubscriptionMetrics();
        setMetrics(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-40 flex items-center justify-center">
        <Loader2Icon className="animate-spin h-8 w-8 text-gray-400" />
      </div>
    );
  }

  if (!metrics) {
    return <div className="text-red-500">Failed to load analytics.</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total MRR</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">£{metrics.mrr.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Approximate Monthly Recurring Revenue
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Subscribers
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.activeSubscribers}</div>
          <p className="text-xs text-muted-foreground">
            Currently paying users
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Trials</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.trialingUsers}</div>
          <p className="text-xs text-muted-foreground">
            Potential conversions next week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Churned/Canceled
          </CardTitle>
          <UserMinus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.churnedUsers}</div>
          <p className="text-xs text-muted-foreground">
            Total lost or canceled
          </p>
        </CardContent>
      </Card>

      {/* Plan Distribution Mini-Chart */}
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Plan Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(metrics.planDistribution).map(
              ([plan, count]) =>
                count > 0 && (
                  <div key={plan} className="flex items-center">
                    <div className="w-24 capitalize text-sm font-medium">
                      {plan}
                    </div>
                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600"
                        style={{
                          width: `${(count / (metrics.activeSubscribers || 1)) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-sm text-gray-500">
                      {count}
                    </div>
                  </div>
                ),
            )}
            {metrics.activeSubscribers === 0 && (
              <p className="text-sm text-gray-500">No active plans yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
