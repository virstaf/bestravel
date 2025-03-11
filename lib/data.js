import { Plane } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Car } from "lucide-react";
import { Building2 } from "lucide-react";
import { Hotel } from "lucide-react";

export const NavLinks = [
  { name: "Home", path: "/", slug: "home" },
  { name: "Explore", path: "/explore", slug: "explore" },
  { name: "Flights", path: "/flights", slug: "flights" },
];

export const benefits = [
  {
    title: "Save Up to 50% on Hotels & Resorts",
    description: "Unlock exclusive discounts on hotels and resorts worldwide.",
    icon: <Building2 />,
  },
  {
    title: "Flight & Vacation Deals",
    description: "Special airfare prices and early package access.",
    icon: <Plane />,
  },
  {
    title: "VIP Airport Lounge Access",
    description: "Relax in premium airport lounges.",
    icon: <Hotel />,
  },
  {
    title: "Car Rental & Cruise Savings",
    description: "Enjoy lower rates on rentals and cruises.",
    icon: <Car />,
  },
  {
    title: "24/7 Travel Assistance",
    description: "Expert support for bookings and emergencies.",
    icon: <MessageCircle />,
  },
];
