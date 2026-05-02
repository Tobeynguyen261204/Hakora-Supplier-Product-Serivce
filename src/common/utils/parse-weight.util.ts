/**
 * Parse weight from various formats to grams (g)
 * Supports formats: "300g", "0.5kg", "500", 500
 * Returns weight in grams for shipping calculations
 *
 * @param raw - Raw weight value (string or number)
 * @returns Weight in grams, or undefined if cannot parse
 *
 * @example
 * parseWeight("300g") // → 300
 * parseWeight("0.5kg") // → 500
 * parseWeight("500") // → 500
 * parseWeight(500) // → 500
 * parseWeight(undefined) // → undefined
 */
export function parseWeight(raw: any): number | undefined {
  if (!raw && raw !== 0) return undefined;

  // Already a number (grams)
  if (typeof raw === 'number') {
    return raw > 0 ? raw : undefined;
  }

  // String format
  if (typeof raw === 'string') {
    const trimmed = raw.toLowerCase().trim();

    // Convert kg to grams
    if (trimmed.includes('kg')) {
      const value = parseFloat(trimmed);
      return !isNaN(value) && value > 0 ? value * 1000 : undefined;
    }

    // Already in grams
    if (trimmed.includes('g')) {
      const value = parseFloat(trimmed);
      return !isNaN(value) && value > 0 ? value : undefined;
    }

    // Plain number as string
    const value = parseFloat(trimmed);
    return !isNaN(value) && value > 0 ? value : undefined;
  }

  return undefined;
}
