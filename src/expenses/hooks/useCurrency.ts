import { useContext } from "react";
import { CurrencyContext } from "../context/CurrencyContext";
import { getCurrencySymbol } from "../util/currencyUtils";

export default function useCurrency() {
  const currencySymbol = useContext(CurrencyContext);
  return getCurrencySymbol(currencySymbol.toUpperCase()) || currencySymbol;
}
