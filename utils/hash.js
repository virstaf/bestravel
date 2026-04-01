/**
 * Generates a deterministic 32-bit integer hash code for a given string.
 * This is useful for consistent UI elements (like placeholder images or CTA copy)
 * based on stable IDs, which prevents hydration mismatches in Next.js.
 *
 * @param {string} str - The string to hash (e.g., a deal ID)
 * @returns {number} A non-negative 32-bit integer
 */
export const hashCode = (str) => {
  if (!str) return 0;
  let hash = 0;
  const stringToHash = String(str);
  for (let i = 0; i < stringToHash.length; i++) {
    const char = stringToHash.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};
