/**
 * Generates a 32-bit integer hash from a string.
 * This is useful for deterministic selection of UI elements (like placeholders or CTA text)
 * based on a stable ID, which prevents hydration mismatches in Next.js.
 *
 * @param {string} str The string to hash
 * @returns {number} A non-negative 32-bit integer
 */
export const hashCode = (str) => {
  let hash = 0;
  if (!str) return hash;

  const stringToHash = String(str);
  for (let i = 0; i < stringToHash.length; i++) {
    const char = stringToHash.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};
