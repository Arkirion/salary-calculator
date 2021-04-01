export const formatToArgentinaCurrency = (value, decimals = 2) => {
  return value.toLocaleString("es-ar", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: decimals,
  });
};
