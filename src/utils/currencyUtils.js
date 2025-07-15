import euroCountries from "@/Data/Countries";

export const getCurrencySymbol = (country) => {
  if (country === "Bangladesh") return "৳";
  if (country === "Denmark") return "kr.";
  if (euroCountries.includes(country)) return "€";
  return "$";
};

export const convertPrice = (price, country, settings) => {
  if (!price) return 0;
  
  if (country === "Bangladesh") return price * (settings?.conversionRateBDT || 1);
  if (country === "Denmark") return price * (settings?.conversionRateDanish || 1);
  if (euroCountries.includes(country)) return price * (settings?.conversionRateEuro || 1);
  return price;
};