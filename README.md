# 🍇 Calculadora de UVAs

Aplicación web moderna para calcular valores de UVAs (Unidad de Valor Adquisitivo) con conversión automática a dólares estadounidenses, utilizando las APIs oficiales del Banco Central de la República Argentina (BCRA).

## ✨ Características

- 📊 Consulta automática del valor actual de UVAs desde la API del BCRA
- 💵 Obtención de la cotización del dólar en tiempo real
- 🔄 Conversión automática de pesos argentinos a dólares
- 📱 Diseño responsive optimizado para móviles, tablets y desktop
- 🌓 Modo oscuro/claro con persistencia de preferencia
- 🎨 Formato de números con separadores de miles (estilo argentino)
- ⚡ Interfaz moderna con animaciones suaves
- 🔒 Fuentes y recursos locales (sin dependencias externas excepto APIs del BCRA)

## 📁 Estructura del Proyecto

```
uvas/
├── config/             # Configuración de la aplicación
│   ├── env.js          # Variables de entorno
│   └── https.js        # Configuración HTTPS
├── services/           # Lógica de negocio
│   └── bcraService.js  # Servicio para APIs del BCRA
├── routes/             # Rutas de la aplicación
│   ├── index.js        # Rutas principales
│   └── api.js          # Rutas de la API REST
├── utils/              # Utilidades
│   ├── dateUtils.js    # Utilidades de fecha
│   └── formatUtils.js  # Utilidades de formato
├── views/              # Vistas HTML
│   └── home.js         # Página principal
├── public/             # Archivos estáticos
│   ├── css/
│   │   └── styles.css  # Estilos CSS con variables para dark mode
│   ├── js/
│   │   └── app.js      # JavaScript del cliente
│   └── favicon.svg     # Favicon (emoji de uvas)
├── .env                # Variables de entorno (no versionado)
├── .gitignore          # Archivos ignorados por git
├── index.js            # Punto de entrada de la aplicación
├── package.json        # Dependencias y scripts
└── README.md           # Este archivo
```

## 📋 Requisitos

- Node.js >= 14.x
- pnpm (o npm/yarn)

## 🚀 Instalación

1. Clonar el repositorio o descargar los archivos

2. Instalar las dependencias:
```bash
pnpm install
```

3. Crear el archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
# Configuración del servidor
PORT=3003

# URLs de las APIs del BCRA
BCRA_API_BASE_URL=<URL_BASE_API_BCRA>
BCRA_ESTADISTICAS_URL=<URL_ESTADISTICAS_BCRA>
BCRA_COTIZACIONES_USD_URL=<URL_COTIZACIONES_USD_BCRA>

# Configuración SSL
REJECT_UNAUTHORIZED=false
```

**Nota:** Las URLs de las APIs del BCRA deben configurarse en el archivo `.env` por seguridad.

## 💻 Uso

### Iniciar el servidor

**Modo producción:**
```bash
pnpm start
```

**Modo desarrollo (con auto-reload):**
```bash
pnpm dev
```

El servidor se iniciará en `http://localhost:3003` (por defecto).

### Endpoints disponibles

La aplicación expone un conjunto mínimo de endpoints por seguridad:

#### Interfaz Web
- `GET /` - Página principal con la calculadora interactiva

#### API REST
- `GET /api/valor` - **Único endpoint público**
  - Devuelve: valor de UVAs, cotización USD y conversión a dólares
  - Usado por el frontend para cargar datos actualizados

#### Testing/Debug
- `GET /bcra` - Endpoint de testing (consulta directa a APIs del BCRA)
  - Solo para pruebas manuales durante desarrollo

### Ejemplo de respuesta de la API

```json
{
  "fecha": "2025-12-23",
  "valor": 1696.95,
  "cotizacionUSD": {
    "fecha": "2025-12-22",
    "cotizacion": 1452
  },
  "valorEnDolares": 1.17
}
```

## ⚙️ Variables de Entorno

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `PORT` | Puerto del servidor | No (default: 3003) |
| `BCRA_API_BASE_URL` | URL base de la API del BCRA | Sí |
| `BCRA_ESTADISTICAS_URL` | URL de estadísticas monetarias | Sí |
| `BCRA_COTIZACIONES_USD_URL` | URL de cotización del dólar | Sí |
| `REJECT_UNAUTHORIZED` | Validación SSL/TLS | No (default: false) |

## 🛠️ Tecnologías

- **Express.js** - Framework web minimalista
- **Axios** - Cliente HTTP para peticiones a las APIs
- **dotenv** - Gestión de variables de entorno
- **CSS Variables** - Para soporte de dark mode
- **System Fonts** - Fuentes nativas del sistema operativo

## 🎨 Características de Diseño

### Modo Oscuro
- Toggle entre modo claro y oscuro
- Persistencia de preferencia en localStorage
- Detección automática de preferencia del sistema
- Transiciones suaves entre modos

### Responsive
- **Mobile** (≤480px): Diseño optimizado para pantallas pequeñas
- **Tablet** (≤768px): Adaptación para tablets
- **Desktop/Laptop**: Aprovechamiento completo del espacio disponible

### Progressive Web App (PWA)
- Instalable en dispositivos móviles y desktop
- Manifest.json configurado
- Favicon optimizado (SVG)
- Meta tags para redes sociales

### Accesibilidad
- Fuentes del sistema optimizadas para cada plataforma
- Contraste adecuado en ambos modos
- Estados focus claros para navegación por teclado
- Labels descriptivos para lectores de pantalla

## 📡 APIs Utilizadas

Este proyecto consume las APIs públicas del BCRA:

1. **API de Estadísticas Monetarias**: Para obtener el valor de las UVAs
2. **API de Estadísticas Cambiarias**: Para obtener la cotización del dólar

## 🏗️ Desarrollo

La aplicación está estructurada siguiendo el patrón MVC adaptado para Node.js:

### Backend
- **Configuración**: Centralizada en `/config`
- **Servicios**: Lógica de negocio separada en `/services`
- **Rutas**: Endpoints organizados en `/routes`
- **Vistas**: Templates HTML en `/views`
- **Utilidades**: Funciones reutilizables en `/utils`

### Frontend
- **HTML**: Estructura en `/views/home.js`
- **CSS**: Estilos con variables CSS en `/public/css/styles.css`
- **JavaScript**: Lógica del cliente en `/public/js/app.js`

Esta separación permite:
- Mejor mantenibilidad del código
- Cacheo efectivo de archivos estáticos
- Desarrollo independiente del frontend y backend
- Código más limpio y organizado

## 🔒 Seguridad

### Principios de seguridad implementados:

- **Superficie mínima de ataque**: Solo un endpoint público (`/api/valor`)
- **Variables de entorno**: URLs de APIs centralizadas en `.env` (no versionado)
- **Sin dependencias externas**: Fuentes y recursos 100% locales (excepto APIs del BCRA)
- **Sin información sensible**: Solo datos públicos del BCRA
- **HTTPS configurado**: Soporte para certificados SSL/TLS
- **Sin exposición de claves**: Las URLs de las APIs no se exponen en el frontend

### Endpoints eliminados por seguridad:
- ❌ `/api/cotizacion-usd` - Eliminado (redundante)
- ❌ `/api/debug-cotizacion` - Eliminado (solo debug)

## 📄 Licencia

ISC
