/**
 * Formatea un número con separador de miles para formato argentino
 * @param {number} numero - Número a formatear
 * @param {number} decimales - Cantidad de decimales (por defecto 2)
 * @returns {string} Número formateado
 */
function formatearNumero(numero, decimales = 2) {
  return numero.toLocaleString('es-AR', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales
  });
}

module.exports = { formatearNumero };
