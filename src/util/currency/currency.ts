const currencyMap = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

export function getCurrencySymbol(currencyCode: string): string {
  return (
    currencyMap[currencyCode.toUpperCase() as keyof typeof currencyMap] ||
    currencyCode
  );
}
