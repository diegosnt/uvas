const axios = require('axios');
const config = require('../config/env');
const { createHttpsAgent } = require('../config/https');
const { obtenerFechaActual } = require('../utils/dateUtils');

/**
 * Obtiene el valor de las UVAs desde la API del BCRA
 * @param {string} fecha - Fecha en formato YYYY-MM-DD (opcional, por defecto fecha actual)
 * @returns {Promise<Object>} Datos de UVAs
 */
async function obtenerValorUvas(fecha = null) {
  try {
    const fechaConsulta = fecha || obtenerFechaActual();
    const url = `${config.estadisticasUrl}?desde=${fechaConsulta}&hasta=${fechaConsulta}&limit=1`;

    const response = await axios.get(url, {
      httpsAgent: createHttpsAgent()
    });

    const data = response.data;
    const results = data.results || [];

    if (results.length === 0 || !results[0].detalle || results[0].detalle.length === 0) {
      throw new Error('No se encontraron datos de UVAs para la fecha especificada');
    }

    const detalle = results[0].detalle[0];

    return {
      fecha: detalle.fecha,
      valor: detalle.valor
    };
  } catch (error) {
    console.error('Error al obtener valor de UVAs:', error.message);
    throw error;
  }
}

/**
 * Obtiene la cotización del dólar desde API
 * @returns {Promise<Object>} Datos de cotización USD oficial
 */
async function obtenerCotizacionUSD() {
  try {
    const url = config.apiUrl;

    const response = await axios.get(url, {
      httpsAgent: createHttpsAgent()
    });

    const data = response.data;

    if (!data || !Array.isArray(data)) {
      throw new Error('No se encontraron datos de cotización USD');
    }

    const cotizacionOficial = data.find(d => d.nombre === 'Oficial');

    if (!cotizacionOficial || !cotizacionOficial.venta) {
      throw new Error('No se encontró cotización oficial de venta para USD');
    }

    return {
      fecha: cotizacionOficial.fechaActualizacion,
      cotizacion: cotizacionOficial.venta
    };
  } catch (error) {
    console.error('Error al obtener cotización USD:', error.message);
    throw error;
  }
}

/**
 * Obtiene el valor de UVAs y la cotización del dólar, y calcula el equivalente en dólares
 * @returns {Promise<Object>} Datos completos con conversión a USD
 */
async function obtenerDatosCompletos() {
  try {
    const [valorUvas, cotizacionUSD] = await Promise.all([
      obtenerValorUvas(),
      obtenerCotizacionUSD()
    ]);

    const valorEnDolares = valorUvas.valor / cotizacionUSD.cotizacion;

    return {
      fecha: valorUvas.fecha,
      valor: valorUvas.valor,
      cotizacionUSD: cotizacionUSD,
      valorEnDolares: valorEnDolares
    };
  } catch (error) {
    console.error('Error al obtener datos completos:', error.message);
    throw error;
  }
}

module.exports = {
  obtenerValorUvas,
  obtenerCotizacionUSD,
  obtenerDatosCompletos
};
