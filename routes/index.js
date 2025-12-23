const express = require('express');
const router = express.Router();
const { renderHome } = require('../views/home');
const bcraService = require('../services/bcraService');

/**
 * GET /
 * Página principal con la calculadora de UVAs
 */
router.get('/', (req, res) => {
  res.send(renderHome());
});

/**
 * GET /bcra
 * Endpoint para consultar directamente la API del BCRA (para testing)
 */
router.get('/bcra', async (req, res) => {
  try {
    const datos = await bcraService.obtenerValorUvas();
    res.json({
      mensaje: 'Datos obtenidos exitosamente',
      ...datos
    });
  } catch (error) {
    console.error('Error en /bcra:', error.message);
    res.status(500).json({
      error: 'Error al consultar la API del BCRA',
      detalle: error.message
    });
  }
});

module.exports = router;
