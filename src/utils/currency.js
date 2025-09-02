export const formatCurrency = (amount, currency = "AUD") => {
  if (amount === null || amount === undefined) return "$0.00";
  
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (number) => {
  if (number === null || number === undefined) return "0";
  
  return new Intl.NumberFormat("en-AU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
};

export const parseNumberInput = (value) => {
  if (!value) return 0;
  // Remove currency symbols and commas, then parse
  const cleaned = value.toString().replace(/[$,\s]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

export const formatABN = (abn) => {
  if (!abn) return "";
  // Format ABN as XX XXX XXX XXX
  const cleaned = abn.replace(/\D/g, "");
  if (cleaned.length !== 11) return abn;
  return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 11)}`;
};

export const generatePayId = (invoiceNumber) => {
  if (!invoiceNumber) return "";
  return `asp${invoiceNumber}@clearitt.com`;
};