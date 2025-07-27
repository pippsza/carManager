export const formatMileage = (mileage) => {
  return mileage.toLocaleString().replace(/,/g, " ");
};

export const getCityFromAddress = (address) => {
  if (!address) return "";
  const parts = address.split(", ");
  if (parts.length >= 2) {
    return parts.slice(-2).join(", ");
  }
  return address;
};
