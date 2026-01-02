/**
 * Genera el HTML de la página principal
 * @returns {string} HTML de la calculadora de UVAs
 */
function renderHome() {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Calculadora de UVAs - Conversión a Dólares | BCRA</title>

      <!-- SEO Meta Tags -->
      <meta name="description" content="Calculadora de UVAs con conversión automática a dólares. Consulta valores actualizados desde la API del BCRA. Diseño moderno con modo oscuro.">
      <meta name="keywords" content="UVAs, calculadora, BCRA, dólar, pesos argentinos, conversión, Argentina">
      <meta name="author" content="Calculadora UVAs">
      <meta name="theme-color" content="#8b5cf6">

      <!-- Open Graph / Facebook -->
      <meta property="og:type" content="website">
      <meta property="og:title" content="Calculadora de UVAs - Conversión a Dólares">
      <meta property="og:description" content="Calcula el valor de UVAs en pesos y dólares con datos actualizados del BCRA. Interfaz moderna y fácil de usar.">
      <meta property="og:site_name" content="Calculadora de UVAs">

      <!-- Twitter Card -->
      <meta name="twitter:card" content="summary">
      <meta name="twitter:title" content="Calculadora de UVAs - Conversión a Dólares">
      <meta name="twitter:description" content="Calcula el valor de UVAs en pesos y dólares con datos actualizados del BCRA.">

      <!-- Favicon -->
      <link rel="icon" type="image/svg+xml" href="/favicon.svg">
      <link rel="apple-touch-icon" href="/favicon.svg">

      <!-- Manifest for PWA -->
      <link rel="manifest" href="/manifest.json">

      <!-- Stylesheet -->
      <link rel="stylesheet" href="/css/styles.css">
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="title-section">
            <h1><img src="/images/grape.svg" alt="Uva" class="grape-icon"> uvas-ar</h1>
            <p class="subtitle">  Calculadora de UVAs</p>
          </div>

          <button id="themeToggle" class="theme-toggle" aria-label="Cambiar tema">
            <span class="theme-icon"><img src="/images/moon.svg" alt="Cambiar tema"></span>
          </button>
        </div>

        <div class="input-group">

          <input type="number" id="cantidad" placeholder="Ingrese la cantidad" min="0" step="0.01">
        </div>

        <button id="calcularBtn" onclick="calcular()" disabled>Calcular Valor</button>

        <div class="info" id="apiInfo">
          <p><strong>Fecha UVA:</strong> <span id="fecha">Cargando...</span></p>
          <p><strong>Cotización UVA:</strong> <span id="valorUnitario">$Cargando...</span></p>
          <p><strong>Cotización UVA:</strong> <span id="valorUnitarioUSD">U$S Cargando...</span></p>
          <p><strong>Fecha USD:</strong> <span id="fechaUSD">Cargando...</span></p>
          <p><strong>Cotización USD:</strong> <span id="cotizacionUSD">$Cargando...</span></p>
        </div>

        <div class="loading" id="loading">Calculando...</div>

        <div class="result" id="result">
          <h2>Resultado</h2>
          <p><strong>Cantidad de UVAs:</strong> <span id="cantidadResult"></span></p>
          <p><strong>Pesos:</strong> <span id="total">$0.00</span></p>
          <p><strong>Dolares:</strong> <span id="totalUSD">U$S 0.00</span></p>
        </div>
      </div>

      <script src="/js/app.js"></script>
    </body>
    </html>
  `;
}

module.exports = { renderHome };
