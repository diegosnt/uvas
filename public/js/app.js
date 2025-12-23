let valorAPI = 0;
let fechaAPI = '';
let cotizacionUSD = null;
let valorEnDolares = 0;

// ========== Dark Mode Toggle ==========
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const html = document.documentElement;

// Cargar tema guardado o detectar preferencia del sistema
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

// Aplicar tema inicial
if (initialTheme === 'dark') {
  html.setAttribute('data-theme', 'dark');
  themeIcon.textContent = '☀️';
}

// Toggle theme
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  // Cambiar icono
  themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

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

/**
 * Muestra un mensaje de error en la interfaz
 */
function mostrarError(mensaje) {
  const apiInfo = document.getElementById('apiInfo');
  apiInfo.innerHTML = `
    <div style="text-align: center; padding: 1rem; color: var(--text-secondary);">
      <p style="font-size: 2rem; margin-bottom: 0.5rem;">⚠️</p>
      <p style="font-weight: 600; margin-bottom: 0.5rem;">${mensaje}</p>
      <p style="font-size: 0.85rem;">Por favor, intenta recargar la página.</p>
    </div>
  `;
}

/**
 * Carga los datos iniciales desde la API
 */
async function cargarDatos() {
  try {
    const response = await fetch('/api/valor');

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }

    const data = await response.json();

    if (!data.valor || !data.fecha) {
      throw new Error('Datos incompletos recibidos de la API');
    }

    valorAPI = data.valor;
    fechaAPI = data.fecha;
    cotizacionUSD = data.cotizacionUSD;
    valorEnDolares = data.valorEnDolares || 0;

    document.getElementById('fecha').textContent = fechaAPI;
    document.getElementById('valorUnitario').textContent = '$' + formatearNumero(valorAPI);

    if (cotizacionUSD && cotizacionUSD.cotizacion && valorEnDolares) {
      document.getElementById('cotizacionUSD').textContent = '$' + formatearNumero(cotizacionUSD.cotizacion);
      document.getElementById('valorUnitarioUSD').textContent = 'U$S ' + formatearNumero(valorEnDolares);
    } else {
      document.getElementById('cotizacionUSD').textContent = 'No disponible';
      document.getElementById('valorUnitarioUSD').textContent = 'No disponible';
    }
  } catch (error) {
    console.error('Error al cargar datos:', error);
    mostrarError('No se pudieron cargar los datos del BCRA');
  }
}

/**
 * Calcula el valor total basado en la cantidad ingresada
 */
async function calcular() {
  const cantidad = parseFloat(document.getElementById('cantidad').value);

  if (!cantidad || cantidad <= 0) {
    alert('Por favor ingrese una cantidad válida');
    return;
  }

  const loading = document.getElementById('loading');
  const result = document.getElementById('result');

  loading.classList.add('show');
  result.classList.remove('show');

  try {
    // Calcular el total en pesos
    const total = cantidad * valorAPI;

    // Calcular el total en dólares
    const totalUSD = valorEnDolares ? cantidad * valorEnDolares : 0;

    // Mostrar resultados con formato de miles
    document.getElementById('cantidadResult').textContent = formatearNumero(cantidad);
    document.getElementById('total').textContent = '$' + formatearNumero(total);

    if (valorEnDolares && cotizacionUSD) {
      document.getElementById('totalUSD').textContent = 'U$S ' + formatearNumero(totalUSD);
    } else {
      document.getElementById('totalUSD').textContent = 'No disponible';
    }

    loading.classList.remove('show');
    result.classList.add('show');
  } catch (error) {
    console.error('Error al calcular:', error);
    loading.classList.remove('show');

    // Mostrar mensaje de error en lugar del resultado
    result.innerHTML = `
      <div style="text-align: center; padding: 1rem;">
        <p style="font-size: 2rem; margin-bottom: 0.5rem;">❌</p>
        <p style="font-weight: 600; color: var(--text-primary);">Error al calcular</p>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem;">
          Por favor, verifica los datos e intenta nuevamente.
        </p>
      </div>
    `;
    result.classList.add('show');
  }
}

// Cargar datos al inicio
cargarDatos();

// Permitir calcular con Enter
document.getElementById('cantidad').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    calcular();
  }
});
