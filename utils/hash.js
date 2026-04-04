/**
 * Generates a deterministic 32-bit integer hash from a string.
 * This is useful for consistent UI selection (like CTA copy or placeholder images)
 * across server and client to prevent hydration mismatches.
 *
 * @param {string} str - The string to hash.
 * @returns {number} A non-negative 32-bit integer.
 */
export const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};
