/**
 * Checks if a remote image URL can be optimized by Next.js based on whitelisted hostnames.
 * @param {string} url - The image URL to check.
 * @returns {boolean} - True if the image is from a whitelisted host and can be optimized.
 */
export const isOptimizableImage = (url) => {
  if (!url || !url.startsWith("http")) return true; // Local images are always optimizable

  try {
    const { hostname } = new URL(url);
    const optimizableHosts = [
      "drive.google.com",
      "images.unsplash.com",
      "ylpkcsmbsnowmbyxhbzw.supabase.co",
    ];

    return optimizableHosts.some((host) => hostname.includes(host));
  } catch (e) {
    return false;
  }
};
