# 🍇 uvas-ar

Calculadora de UVAs - Aplicación web moderna para calcular valores de UVAs (Unidad de Valor Adquisitivo) con conversión automática a dólares estadounidenses.

## ✨ Características

- 📊 Consulta automática del valor actual de UVAs
- 💵 Obtención de la cotización del dólar oficial en tiempo real
- 🔄 Conversión automática de pesos argentinos a dólares
- 📱 Diseño responsive optimizado para móviles, tablets y desktop
- 🌓 Modo oscuro/claro con persistencia de preferencia
- 🎨 Formato de números con separadores de miles (estilo argentino)
- ⚡ Interfaz moderna y minimalista
- 🔒 Fuentes y recursos locales

## 📁 Estructura del Proyecto

```
uvas/
├── config/             # Configuración de la aplicación
│   ├── env.js          # Variables de entorno
│   └── https.js        # Configuración HTTPS
├── services/           # Lógica de negocio
│   └── bcraService.js  # Servicio para obtener datos de UVAs y cotización USD
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

# URLs de las APIs
API_BASE_URL=<URL_BASE_API>
ESTADISTICAS_URL=<URL_ESTADISTICAS_UVA>
API_URL=<URL_COTIZACION_DOLAR>

# Configuración SSL
REJECT_UNAUTHORIZED=false
```

**Nota:** Las URLs de las APIs deben configurarse en el archivo `.env` por seguridad.

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

### Ejemplo de respuesta de la API

```json
{
  "fecha": "2025-12-28",
  "valor": 1696.95,
  "cotizacionUSD": {
    "fecha": "2025-12-28T17:00:00.000Z",
    "cotizacion": 1475
  },
  "valorEnDolares": 1.15
}
```

## ⚙️ Variables de Entorno

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `PORT` | Puerto del servidor | No (default: 3003) |
| `API_BASE_URL` | URL base de la API | Sí |
| `ESTADISTICAS_URL` | URL para obtener valores de UVAs | Sí |
| `API_URL` | URL para obtener cotización del dólar oficial | Sí |
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

## 📡 Fuentes de Datos

La aplicación obtiene información actualizada de:

1. Valores de UVAs (Unidad de Valor Adquisitivo)
2. Cotización oficial del dólar estadounidense

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

- **Variables de entorno**: URLs de APIs centralizadas en `.env` (no versionado)
- **Sin dependencias externas**: Fuentes y recursos 100% locales
- **Sin información sensible**: Solo datos públicos
- **HTTPS configurado**: Soporte para certificados SSL/TLS
- **Sin exposición de claves**: Las URLs de las APIs no se exponen en el frontend
- **Botón de cálculo inteligente**: Solo habilitado cuando hay valores válidos


## 📄 Licencia

ISC
