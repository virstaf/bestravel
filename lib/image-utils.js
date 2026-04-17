/**
 * Checks if a remote URL's hostname matches the whitelisted patterns in next.config.mjs.
 * This ensures Next.js image optimization is only bypassed when necessary.
 *
 * @param {string} url - The image URL to check.
 * @returns {boolean} - True if the image can be optimized by Next.js.
 */
export const isOptimizableImage = (url) => {
  if (!url || !url.startsWith("http")) return true;

  try {
    const { hostname } = new URL(url);
    const whitelistedHostnames = [
      "drive.google.com",
      "images.unsplash.com",
      "ylpkcsmbsnowmbyxhbzw.supabase.co",
    ];

    return whitelistedHostnames.includes(hostname);
  } catch (e) {
    return false;
  }
};
