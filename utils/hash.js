/**
 * Generates a deterministic 32-bit integer hash from a string.
 * Useful for stable UI selections and avoiding hydration mismatches.
 * @param {string} str - The input string to hash.
 * @returns {number} A non-negative 32-bit integer.
 */
export const hashCode = (str) => {
  if (!str) return 0;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};
