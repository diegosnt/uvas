require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3003,
  apiBaseUrl: process.env.API_BASE_URL,
  estadisticasUrl: process.env.ESTADISTICAS_URL,
  cotizacionesUsdUrl: process.env.COTIZACIONES_USD_URL,
  apiUrl: process.env.API_URL,
  rejectUnauthorized: process.env.REJECT_UNAUTHORIZED === 'true'
};
