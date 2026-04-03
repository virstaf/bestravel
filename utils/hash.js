/**
 * Simple 32-bit integer string hashing function.
 * Used for deterministic selection of UI elements like CTA copy or placeholder images.
 * @param {string} str - The string to hash.
 * @returns {number} - The 32-bit hash value.
 */
export const hashCode = (str) => {
  let hash = 0;
  if (!str) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};
