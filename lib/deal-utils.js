/**
 * Centralized pricing logic for travel deals.
 * Calculates original price, discounted price, savings, and discount percentage.
 *
 * @param {Object} deal - The deal object containing pricing information.
 * @returns {Object} - Calculated price metrics.
 */
export function calculateDealPrices(deal) {
  const calculateBaseDiscounted = (price) => {
    return deal.discount_percentage
      ? price * (1 - deal.discount_percentage / 100)
      : deal.discount_amount
        ? price - deal.discount_amount
        : price;
  };

  const priceOptions = [];
  const baseOriginal = deal.original_price || 1299;
  const baseSale = calculateBaseDiscounted(baseOriginal);
  priceOptions.push({ sale: baseSale, original: baseOriginal });

  if (deal.location_prices?.length > 0) {
    deal.location_prices.forEach((lp) => {
      if (lp.price) {
        const sPrice = parseFloat(lp.price);
        const oPrice = lp.original_price ? parseFloat(lp.original_price) : sPrice;
        if (!isNaN(sPrice)) {
          priceOptions.push({ sale: sPrice, original: oPrice });
        }
      }
    });
  }

  priceOptions.sort((a, b) => a.sale - b.sale);
  const best = priceOptions[0];
  const savings = best.original - best.sale;
  const discount = savings > 0 ? Math.round((savings / best.original) * 100) : null;

  return {
    originalPrice: best.original,
    discountedPrice: best.sale,
    savings,
    discountPercentage: discount,
  };
}
