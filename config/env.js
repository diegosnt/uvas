require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3003,
  bcraApiBaseUrl: process.env.BCRA_API_BASE_URL,
  bcraEstadisticasUrl: process.env.BCRA_ESTADISTICAS_URL,
  bcraCotizacionesUsdUrl: process.env.BCRA_COTIZACIONES_USD_URL,
  rejectUnauthorized: process.env.REJECT_UNAUTHORIZED === 'true'
};
