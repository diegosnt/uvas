const express = require('express');
const router = express.Router();
const bcraService = require('../services/bcraService');

/**
 * GET /api/valor
 * Obtiene el valor de UVAs con cotización del dólar y conversión
 */
router.get('/valor', async (req, res) => {
  try {
    const datos = await bcraService.obtenerDatosCompletos();
    res.json(datos);
  } catch (error) {
    console.error('Error en /api/valor:', error.message);
    res.status(500).json({
      error: 'Error al consultar la API del BCRA',
      detalle: error.message
    });
  }
});

module.exports = router;
