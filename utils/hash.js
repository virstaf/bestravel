/**
 * Computes a 32-bit integer hash from a string.
 * Used for deterministic UI values (like image selection or CTA copy) to avoid hydration mismatches.
 * @param {string} str - The input string to hash.
 * @returns {number} - A non-negative 32-bit integer.
 */
export const hashCode = (str) => {
  let hash = 0;
  if (!str) return hash;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    const char = s.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};
