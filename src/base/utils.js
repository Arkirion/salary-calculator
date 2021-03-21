
export const toArgentinaCurrency = (value, decimals = 4) =>{
  return value.toLocaleString('es-ar', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: decimals
});
}