# Deployment en AWS Amplify con SSR

## Configuración del Pipeline

Este proyecto está configurado para deployment en AWS Amplify con Server-Side Rendering (SSR) y prerenderizado.

### Archivos de Configuración

1. **`amplify.yml`** - Configuración principal para Amplify

2. **`prerender.config.js`** - Rutas para prerenderizado

### Scripts Disponibles

```bash
# Build estándar
npm run build

# Build con SSR
npm run build:ssr

# Build con prerenderizado
npm run build:prerender

# Prerenderizado únicamente
npm run prerender

# Servir aplicación SSR localmente
npm run serve:ssr
```

### Pasos para Deployment

1. **Conectar repositorio en Amplify Console**
2. **Seleccionar rama principal** (main/master)
3. **Configurar build settings**:
   - Build image: `Amazon Linux:2023`
   - Build commands: Usar `amplify.yml`
4. **Configurar variables de entorno** (si es necesario)
5. **Deploy**

### Estructura de Salida

Después del build, Amplify servirá desde:

```
dist/glow-skin-angular/
├── browser/          # Archivos del cliente
├── server/           # Archivos del servidor SSR
└── prerender/        # Páginas prerenderizadas
```

### Optimizaciones

- **Cache**: Configurado para node_modules y .angular/cache
- **Headers**: Optimizados para archivos estáticos y HTML
- **Prerenderizado**: Páginas principales pre-generadas para mejor SEO

### Troubleshooting

Si el build falla:

1. Verificar que todas las dependencias estén en `package.json`
2. Revisar logs de build en Amplify Console
3. Probar build localmente con `npm run build:prerender`
