import { Plane } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Search } from "lucide-react";
import { Home } from "lucide-react";
import { PlaneIcon } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { Calendar1 } from "lucide-react";
import { Settings2Icon } from "lucide-react";
import { UmbrellaIcon } from "lucide-react";
import { RocketIcon } from "lucide-react";
import { Car } from "lucide-react";
import { Building2 } from "lucide-react";
import { Hotel } from "lucide-react";

export const NavLinks = [
  // { name: "Home", path: "/", slug: "home" },
  // { name: "Explore", path: "/explore", slug: "explore" },
  // { name: "Flights", path: "/flights", slug: "flights" },
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

export const howItWorks = [
  {
    title: "Sign Up for Free",
    description: "Join today and unlock premium travel perks.",
    icon: <RocketIcon />,
  },
  {
    title: "Explore Exclusive Deals",
    description: "Save on flights, hotels, and vacations.",
    icon: <Search />,
  },
  {
    title: "Travel & Enjoy",
    description: "Experience luxury at unbeatable prices.",
    icon: <UmbrellaIcon />,
  },
];

export const destinations = [
  {
    title: "Bali, Indonesia",
    description: "Luxury resorts with exclusive discounts.",
    isFeatured: true,
    imgSrc: "/images/bali.jpg",
  },
  {
    title: "Swiss Alps",
    description: "Special ski vacation deals.",
    isFeatured: false,
    imgSrc: "/images/swiss-alps.jpg",
  },
  {
    title: "New York City",
    description: "VIP hotel and dining perks.",
    isFeatured: true,
    imgSrc: "/images/new-york.jpg",
  },
  {
    title: "Maldives",
    description: "Unforgettable honeymoon and getaway packages.",
    isFeatured: true,
    imgSrc: "/images/maldives.jpg",
  },
];

export const faqs = [
  {
    question: "1. What is Virstravel Perks Club?",
    answer:
      "Virstravel Perks Club is an exclusive travel membership program that offers discounts on hotels, flights, car rentals, cruises, and VIP travel benefits like airport lounge access and concierge services.",
  },
  {
    question: "2. How much does membership cost?",
    answer:
      "Membership prices vary, but for a limited time, you can get up to 50% off your membership fees when you sign up today!",
  },
  {
    question: "3. How do I use my exciting travel credit?",
    answer:
      "Once you sign up, your travel credits will be automatically applied to your account and can be used for hotel bookings through our platform.",
  },
  {
    question: "4. Are there any hidden fees?",
    answer:
      "No! We believe in transparency—there are no hidden fees, and all perks are included with your membership.",
  },
  {
    question: "5. How do I cancel my membership?",
    answer:
      "You can cancel your membership anytime through your account settings or by contacting our 24/7 support team.",
  },
  // { question: "question", answer: "answer" },
];

export const testimonials = [
  {
    message:
      "Virstravel Perks Club helped me save hundreds on my dream vacation!",
    author: "Jessica M.",
    stars: 5,
  },
  {
    message: "The VIP lounge access made my airport experience so much better!",
    author: "David R.",
    stars: 4,
  },
  {
    message: "The customer support is outstanding, and the savings are real!",
    author: "Mark L.",
    stars: 5,
  },
];

export const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/1PhzpgXYdC/?mibextid=wwXIfr",
    icon: "/socials/facebook.svg",
  },
  {
    name: "X",
    url: "https://x.com",
    icon: "/socials/x.svg",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/virstravel?igsh=MTQ2cnFiMnN1NTNvMQ%3D%3D&utm_source=qr",
    icon: "/socials/instagram.svg",
  },
  {
    name: "Pinterest",
    url: "https://pinterest.com",
    icon: "/socials/pinterest.svg",
  },
];

export const footerLinks = [
  { name: "About Us", url: "#why-join" },
  { name: "FAQ", url: "#faq-section" },
  { name: "Terms & Conditions", url: "#" },
  { name: "Privacy Policy", url: "#" },
];

export const sidebarNav = [
  { name: "Home", path: "/dashboard", icon: Home },
  { name: "Deals", path: "/dashboard/deals", icon: ShoppingBag },
  { name: "Trips", path: "/dashboard/trips", icon: Calendar1 },
  { name: "Flights", path: "/dashboard/flights", icon: PlaneIcon },
  { name: "Settings", path: "/dashboard/settings", icon: Settings2Icon },
];

export const hotDeals = [
  {
    title: "Mount Bromo",
    description: "Volcano in East Java",
    price: "4500",
    id: "EBDG12",
    rating: "4.9",
    imgSrc: "/images/sunset.jpg",
  },
  {
    title: "Bali",
    description: "Luxury resorts with exclusive discounts",
    price: "4500",
    id: "EBDG12",
    rating: "4.9",
    imgSrc: "/images/lady_beach.jpg",
  },
  {
    title: "Swiss Alps",
    description: "Special ski vacation deals",
    price: "4500",
    id: "EBDG12",
    rating: "4.9",
    imgSrc: "/images/swiss-alps.jpg",
  },
  {
    title: "New York City",
    description: "VIP hotel and dining perks",
    price: "4500",
    id: "EBDG12",
    rating: "4.9",
    imgSrc: "/images/woman-on-canoe.jpg",
  },
  {
    title: "Maldives",
    description: "Unforgettable honeymoon and getaway packages",
    price: "4500",
    id: "EBDG12",
    rating: "4.9",
    imgSrc: "/images/maldives_beach.jpg",
  },
];

export const hotels = [
  {
    id: 1,
    name: "Ocean View Hotel",
    location: "Cape Coast, Ghana",
    image: "/images/hotels/2018_Pres_Suites_",
    rating: 4.8,
    price: 150,
  },
  {
    id: 2,
    name: "Savannah Lodge",
    location: "Tamale, Ghana",
    image: "/images/hotels/2018_Pres_Suites_",
    rating: 4.5,
    price: 120,
  },
  {
    id: 3,
    name: "Mountain Peak Resort",
    location: "Aburi, Ghana",
    image: "/images/hotels/2018_Pres_Suites_",
    rating: 4.7,
    price: 180,
  },
  {
    id: 4,
    name: "Serene Retreat Hotel",
    location: "Kumasi, Ghana",
    image: "/images/hotels/2018_Pres_Suites_",
    rating: 4.7,
    price: 180,
  },
  {
    id: 5,
    name: "Luxury Bay Hotel",
    location: "Accra, Ghana",
    image: "/images/hotels/2018_Pres_Suites_",
    rating: 4.7,
    price: 180,
  },
];
