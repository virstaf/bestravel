import { Ticket } from "lucide-react";
import { Users } from "lucide-react";
import { Handshake } from "lucide-react";
import { Tag } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
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

export const adminNavLinks = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
    pageTitle: "Dashboard",
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
    pageTitle: "User Management",
  },
  {
    title: "Trip Reservations",
    url: "/admin/reservations",
    icon: Ticket,
    pageTitle: "Reservations",
  },
  {
    title: "Quotes",
    url: "/admin/quotes",
    icon: Briefcase,
    pageTitle: "Quotes",
  },
  {
    title: "Deals & Offers",
    url: "/admin/deals",
    icon: Tag,
    pageTitle: "Deals & Offers",
  },
];

export const flightSearchOptions = [
  {
    name: "BTres",
    url: "https://www.btres.com/",
  },
  {
    name: "Travelpack",
    url: "https://www.travelpack.com",
  },
  {
    name: "Cockpit",
    url: "https://cockpit.aerticket.co.uk/en/home/#/flight",
  },
];

export const hotelSearchOptions = [
  {
    name: "RateHawk",
    url: "https://www.ratehawk.com/",
  },
  {
    name: "Cockpit",
    url: "https://cockpit.aerticket.co.uk/en/home/#/flight",
  },
  {
    name: "Travelpack",
    url: "https://www.travelpack.com",
  },
];

export const transferSearchOptions = [
  {
    name: "RateHawk",
    url: "https://www.ratehawk.com/",
  },
  {
    name: "Cockpit",
    url: "https://cockpit.aerticket.co.uk/en/home/#/flight",
  },
  {
    name: "Travelpack",
    url: "https://www.travelpack.com",
  },
];
