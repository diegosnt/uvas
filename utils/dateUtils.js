/**
 * Obtiene la fecha actual en formato YYYY-MM-DD
 * @returns {string} Fecha en formato YYYY-MM-DD
 */
function obtenerFechaActual() {
  const fecha = new Date();
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0');
  const day = String(fecha.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

module.exports = { obtenerFechaActual };
