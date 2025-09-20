# Configuración de Archivos SEO

## 📁 Archivos SEO Configurados

### ✅ Archivos Incluidos

- **`src/robots.txt`** - Instrucciones para bots de búsqueda
- **`src/sitemap.xml`** - Mapa del sitio con todas las URLs
- **`src/llm.txt`** - Información para modelos de lenguaje e IA

### 🔧 Configuración en Angular

#### `angular.json`

```json
{
  "assets": [
    "src/favicon.ico",
    "src/assets",
    "src/robots.txt",    ← Incluido en compilación
    "src/sitemap.xml",   ← Incluido en compilación
    "src/llm.txt"        ← Incluido en compilación
  ]
}
```

### 🚀 Configuración en Amplify

#### Headers Optimizados

```yaml
customHeaders:
  # SEO Files - Optimized for search engines
  - pattern: "robots.txt"
    headers:
      - key: "Content-Type"
        value: "text/plain; charset=utf-8"
      - key: "Cache-Control"
        value: "public, max-age=86400"

  - pattern: "sitemap.xml"
    headers:
      - key: "Content-Type"
        value: "application/xml; charset=utf-8"
      - key: "Cache-Control"
        value: "public, max-age=86400"

  - pattern: "llm.txt"
    headers:
      - key: "Content-Type"
        value: "text/plain; charset=utf-8"
      - key: "Cache-Control"
        value: "public, max-age=86400"
```

#### Redirects Específicos

```yaml
redirects:
  # SEO Files - Serve directly (no redirects)
  - source: "/robots.txt"
    target: "/robots.txt"
    status: "200"
  - source: "/sitemap.xml"
    target: "/sitemap.xml"
    status: "200"
  - source: "/llm.txt"
    target: "/llm.txt"
    status: "200"
```

## 🌐 URLs Accesibles

Una vez deployado, los archivos estarán disponibles en:

- **📄 https://glowskinbq.com/robots.txt**
- **🗺️ https://glowskinbq.com/sitemap.xml**
- **🤖 https://glowskinbq.com/llm.txt**

## 🧪 Verificación

### Script Automático

```bash
npm run verify-seo
```

Este script verifica:

- ✅ Existencia de archivos
- ✅ Contenido válido
- ✅ Configuración en angular.json
- ✅ Configuración en amplify.yml

### Verificación Manual

#### Verificar robots.txt

```bash
curl -I https://glowskinbq.com/robots.txt
# Debe retornar: Content-Type: text/plain; charset=utf-8
```

#### Verificar sitemap.xml

```bash
curl -I https://glowskinbq.com/sitemap.xml
# Debe retornar: Content-Type: application/xml; charset=utf-8
```

#### Verificar llm.txt

```bash
curl -I https://glowskinbq.com/llm.txt
# Debe retornar: Content-Type: text/plain; charset=utf-8
```

## 🔄 Proceso de Build

1. **Build Local**: `npm run build:prerender`

   - Copia archivos SEO a `dist/glow-skin-angular/browser/`

2. **Deploy Amplify**:
   - Amplify sirve archivos directamente
   - Headers configurados automáticamente
   - No hay redirects que interfieran

## 🚨 Troubleshooting

### Problema: Archivo no accesible

- ✅ Verificar que esté en `angular.json` assets
- ✅ Verificar que no haya redirects conflictivos
- ✅ Verificar headers en amplify.yml

### Problema: Content-Type incorrecto

- ✅ Verificar configuración de headers en amplify.yml
- ✅ Verificar que el patrón coincida exactamente

### Problema: Cache incorrecto

- ✅ Los archivos SEO tienen cache de 24h (86400s)
- ✅ Para forzar actualización, cambiar contenido

## 📊 Beneficios de la Configuración

1. **🤖 Bots de Búsqueda**: Acceso directo y rápido a robots.txt
2. **🗺️ Indexación**: Sitemap.xml con todas las 18 URLs
3. **🧠 IA/LLM**: Información estructurada en llm.txt
4. **⚡ Performance**: Cache optimizado (24h para archivos SEO)
5. **🔒 Seguridad**: Headers correctos y sin exposición de archivos sensibles

---

**Última actualización**: Enero 2025
**Configurado por**: Asistente IA
**Estado**: ✅ Completamente funcional
