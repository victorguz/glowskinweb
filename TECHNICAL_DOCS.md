# Documentación Técnica - GlowSkin Angular

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico

- **Frontend**: Angular 17 + TypeScript
- **Styling**: Tailwind CSS + SCSS
- **SSR**: Angular Universal
- **Deployment**: AWS Amplify
- **Build Tool**: Angular CLI

### Estructura de Archivos

```
glowskinweb/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes reutilizables
│   │   ├── pages/              # Páginas principales
│   │   └── services/           # Servicios y APIs
│   ├── assets/
│   │   ├── images/             # Imágenes optimizadas
│   │   └── data/               # Datos JSON
│   └── styles/                 # Estilos globales
├── amplify.yml                  # Configuración Amplify
├── server.ts                   # Servidor Express SSR
├── prerender.config.js         # Rutas prerenderizadas
└── angular.json               # Configuración Angular
```

## 🔧 Configuración SSR

### Entry Points

- **Cliente**: `src/main.ts`
- **Servidor**: `src/main.server.ts`
- **Server**: `server.ts` (Express.js)

### Configuración Angular

```json
{
  "server": "src/main.server.ts",
  "prerender": true,
  "ssr": {
    "entry": "server.ts"
  }
}
```

### Servidor Express

```typescript
// server.ts
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, "../browser");

  // Serve static files
  server.get("*.*", express.static(browserDistFolder, { maxAge: "1y" }));

  // All routes use Universal engine
  server.get("*", (req, res) => {
    res.sendFile(join(browserDistFolder, "index.html"));
  });

  return server;
}
```

## 📦 Build Process

### 1. Build Estándar (SPA)

```bash
ng build
```

- Genera: `dist/glow-skin-angular/browser/`
- Tipo: Single Page Application
- SEO: Limitado

### 2. Build con SSR

```bash
ng build
```

- Genera:
  - `dist/glow-skin-angular/browser/` (cliente)
  - `dist/glow-skin-angular/server/` (servidor)
- Tipo: Server-Side Rendering
- SEO: Mejorado

### 3. Build con Prerenderizado

```bash
ng build && ng run glow-skin-angular:prerender
```

- Genera: Páginas HTML estáticas
- Tipo: Static Site Generation
- SEO: Óptimo

## 🚀 Deployment Pipeline

### AWS Amplify Configuration

#### amplify.yml (Principal)

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
        - npm run prerender
  artifacts:
    baseDirectory: dist/glow-skin-angular
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
      - .angular/cache/**/*
```

### Headers de Cache

```yaml
customHeaders:
  - pattern: "**/*.html"
    headers:
      - key: "Cache-Control"
        value: "max-age=0, no-cache, no-store, must-revalidate"
  - pattern: "**/*.js"
    headers:
      - key: "Cache-Control"
        value: "max-age=31536000"
  - pattern: "**/*.css"
    headers:
      - key: "Cache-Control"
        value: "max-age=31536000"
```

## 📊 Optimizaciones

### Performance

1. **Lazy Loading**

   ```typescript
   const routes: Routes = [
     {
       path: "blog",
       loadChildren: () => import("./pages/blog/blog.module").then((m) => m.BlogModule),
     },
   ];
   ```

2. **Image Optimization**

   - Formato WebP para mejor compresión
   - Lazy loading de imágenes
   - Responsive images

3. **Bundle Optimization**
   - Tree shaking automático
   - Code splitting por rutas
   - Compression gzip/brotli

### SEO

1. **Meta Tags Dinámicos**

   ```typescript
   // En cada componente
   this.meta.updateTag({ name: "description", content: "Descripción" });
   this.meta.updateTag({ property: "og:title", content: "Título" });
   ```

2. **Structured Data**

   ```typescript
   // JSON-LD para Google
   this.schemaService.addOrganization({
     name: "GlowSkin",
     url: "https://glowskinbq.com",
   });
   ```

3. **Sitemap**
   - Generado automáticamente
   - Incluye todas las rutas prerenderizadas

## 🔍 Troubleshooting

### Build Errors

#### Error: Cannot find module

```bash
# Solución
rm -rf node_modules package-lock.json
npm install
```

#### Error: SSR build fails

```bash
# Verificar configuración
cat angular.json | grep -A 10 "server"
cat src/main.server.ts
```

#### Error: Prerender fails

```bash
# Verificar rutas
cat prerender.config.js
# Rebuild
npm run build:prerender
```

### Runtime Errors

#### Error: Hydration mismatch

- Verificar que el contenido sea igual en cliente y servidor
- Usar `isPlatformBrowser` para código específico del cliente

#### Error: Express server not starting

```bash
# Verificar puerto
echo $PORT
# Verificar archivos
ls -la dist/glow-skin-angular/server/
```

### Performance Issues

#### Bundle size too large

```bash
# Analizar bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/glow-skin-angular/browser/stats.json
```

#### Slow initial load

- Implementar lazy loading
- Optimizar imágenes
- Usar CDN para assets

## 🧪 Testing

### Unit Tests

```bash
# Ejecutar tests
npm test

# Con coverage
ng test --code-coverage

# Watch mode
ng test --watch
```

### E2E Tests

```bash
# Instalar Playwright
npm install -D @playwright/test

# Ejecutar tests
npx playwright test
```

### SSR Testing

```bash
# Build SSR
npm run build:ssr

# Servir localmente
npm run serve:ssr

# Test en http://localhost:4000
```

## 📈 Monitoring

### Performance Metrics

- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)

### SEO Metrics

- **Core Web Vitals**
- **Mobile-friendliness**
- **PageSpeed Insights**

### Error Tracking

- **Console errors**
- **Network errors**
- **SSR hydration errors**

## 🔄 CI/CD

### GitHub Actions (Opcional)

```yaml
name: Build and Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run build:prerender
      - run: npm test
```

### Pre-commit Hooks

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

## 📚 Referencias

- [Angular SSR Guide](https://angular.io/guide/ssr)
- [AWS Amplify Docs](https://docs.aws.amazon.com/amplify/)
- [Angular Performance](https://angular.io/guide/performance)
- [Web Vitals](https://web.dev/vitals/)
