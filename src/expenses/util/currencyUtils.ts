const currency = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

export function getCurrencySymbol(currencyCode: string): string {
  return (
    currency[currencyCode.toUpperCase() as keyof typeof currency] ||
    currencyCode
  );
}
