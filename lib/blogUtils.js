import fs from "fs";
import path from "path";

const postDirectory = path.join(process.cwd(), "blogposts");

/**
 * Calculate reading time based on word count
 * Average reading speed: 200 words per minute
 */
export function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
}

/**
 * Extract category from blog post content or filename
 */
export function extractCategory(id, content) {
  // You can customize this logic based on your needs
  // For now, we'll use simple keyword matching
  const lowerContent = content.toLowerCase();

  if (lowerContent.includes("member") || lowerContent.includes("vip")) {
    return "Membership";
  } else if (
    lowerContent.includes("booking") ||
    lowerContent.includes("deal")
  ) {
    return "Travel Tips";
  } else if (lowerContent.includes("trust") || lowerContent.includes("story")) {
    return "Success Stories";
  } else if (
    lowerContent.includes("dubai") ||
    lowerContent.includes("destination")
  ) {
    return "Destinations";
  }

  return "Travel";
}

/**
 * Get featured image for a blog post
 * Maps blog posts to appropriate images from the public directory
 */
export function getFeaturedImage(id) {
  // Map specific blog posts to relevant images
  const imageMap = {
    "travel-smarter-with-virstravelclub": "/images/desk_passport.jpg",
    "why-thousands-are-choosing-virstravelclub-for-their-travel-bookings":
      "/images/happy-black-woman-laughing-on-street.jpg",
    "virstravelclub-built-trust-through-travel":
      "/images/couple-enjoying-view-of-sydney-opera-house.jpg",
    "dami-saved-over-1000-on-his-dream-dubai-trip-without-lifting-a-finger":
      "/images/joyful-woman-dancing-by-the-ocean-in-colombia.jpg",
    "why-smart-travellers-are-joining-travel-clubs-like-virstravel":
      "/images/woman-on-canoe.jpg",
    "power-of-travel-perks-membership": "/images/cheers-at-sea-side.jpg",
    "gateway-to-exclusive-travel-perks": "/images/jetty-in-sea.jpg",
    "Why-It-Matters-for-Virstravel-Club-VIP-and-VVIP-Members":
      "/images/lady_beach.jpg",
  };

  // Return the mapped image or null for default gradient
  return imageMap[id] || null;
}
