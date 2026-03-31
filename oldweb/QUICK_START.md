# 🚀 Quick Start - GlowSkin Angular

## ⚡ Comandos Rápidos

### Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm start

# Servidor con SSR (puerto 4000)
npm run serve:ssr
```

### Build

```bash
# Build para producción (recomendado)
npm run build:prerender

# Build solo SSR
npm run build:ssr

# Build estándar
npm run build
```

### Verificación

```bash
# Verificar SSR funciona
curl http://localhost:4000

# Verificar archivos generados
ls dist/glow-skin-angular/browser/
ls dist/glow-skin-angular/server/
```

### Testing

```bash
# Tests unitarios
npm test

# Tests con coverage
ng test --code-coverage
```

## ✅ Estado de las Pruebas

### Build Tests ✅

- **Build estándar**: ✅ Funcionando
- **Build SSR**: ✅ Funcionando
- **Build prerenderizado**: ✅ Funcionando
- **Budgets CSS**: ✅ Ajustados (6kb warning, 8kb error)

### SSR Tests ✅

- **Servidor SSR**: ✅ Funcionando en puerto 4000
- **Prerenderizado**: ✅ 6 rutas generadas
- **Archivos estáticos**: ✅ Servidos correctamente

## 📋 Checklist de Deployment

### Antes del Deploy

- [ ] Tests pasando: `npm test`
- [ ] Build exitoso: `npm run build:prerender`
- [ ] Imágenes optimizadas (WebP)
- [ ] Meta tags actualizados
- [ ] URLs de producción configuradas

### En Amplify Console

- [ ] Repositorio conectado
- [ ] Rama principal seleccionada
- [ ] Build settings: `amplify.yml`
- [ ] Variables de entorno configuradas
- [ ] Domain configurado

### Post-Deploy

- [ ] Verificar SSR funciona
- [ ] Probar prerenderizado
- [ ] Verificar SEO (Google Search Console)
- [ ] Testear en móvil
- [ ] Verificar performance (PageSpeed Insights)

## 🔧 Configuración Rápida

### Variables de Entorno

```bash
NODE_ENV=production
PORT=3000
```

### Headers Importantes

```yaml
Cache-Control: max-age=31536000  # Para JS/CSS
Cache-Control: max-age=0          # Para HTML
```

### Rutas Críticas

- `/` - Home
- `/nosotros` - Sobre nosotros
- `/precios` - Servicios
- `/blog` - Blog
- `/casos-reales` - Casos de éxito

## 🚨 Troubleshooting Rápido

### Build Fails

```bash
# Limpiar cache
rm -rf .angular/cache node_modules
npm install
npm run build:prerender
```

### SSR Issues

```bash
# Verificar configuración
cat angular.json | grep server
cat src/main.server.ts
```

### Performance Issues

```bash
# Analizar bundle
ng build --stats-json
# Verificar imágenes WebP
ls src/images/*.webp
```

## 📞 Contacto

- **Desarrollo**: [Tu email]
- **DevOps**: [DevOps email]
- **Documentación**: README.md
- **Técnico**: TECHNICAL_DOCS.md

## 🔗 Enlaces Útiles

- **Amplify Console**: [URL de tu proyecto]
- **GitHub**: [URL del repositorio]
- **Google Search Console**: [URL]
- **PageSpeed Insights**: [URL del sitio]

---

**Última actualización**: $(date)
**Versión**: 1.0.0
