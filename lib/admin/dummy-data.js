import { Briefcase } from "lucide-react";

export const summaryMetrics = [
  {
    title: "Total Pending Requests",
    value: 24,
    description: "Requests that are pending approval",
    icon: Briefcase,
    status: "warning",
  },
  {
    title: "Reservations this Month",
    value: 176,
    description: "Total reservations made this month",
    icon: Briefcase,
    status: "success",
  },
  {
    title: "New Users this Week",
    value: "6",
    description: "Total new users registered this week",
    icon: Briefcase,
    status: "success",
  },
  {
    title: "Average Response Time",
    value: "4h 30m",
    description: "Current average response time",
    icon: Briefcase,
    status: "error",
  },
];
