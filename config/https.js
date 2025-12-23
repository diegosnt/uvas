const https = require('https');
const config = require('./env');

/**
 * Crea un agente HTTPS con la configuración necesaria para las peticiones al BCRA
 * @returns {https.Agent}
 */
function createHttpsAgent() {
  return new https.Agent({
    rejectUnauthorized: config.rejectUnauthorized
  });
}

module.exports = { createHttpsAgent };
