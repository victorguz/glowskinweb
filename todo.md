# TODO - Glow Skin Website

## 📋 **INSTRUCCIONES DE EJECUCIÓN**

### **IMPORTANTE: Antes de comenzar cualquier fase**

- ✅ **Siempre preguntar al usuario si desea comenzar con la fase específica**
- ✅ **Esperar confirmación antes de proceder**
- ✅ **Crear backup del proyecto original antes de cualquier cambio**
- ✅ **Documentar cada paso realizado**

### **Proceso de Ejecución Recomendado:**

1. **Revisar** el estado actual del proyecto
2. **Confirmar** con el usuario la fase a ejecutar
3. **Crear backup** si es necesario
4. **Ejecutar** las tareas de la fase
5. **Probar** funcionalidades
6. **Documentar** cambios realizados
7. **Confirmar** con el usuario antes de continuar

---

## 🏗️ **MIGRACIÓN A ANGULAR 19 CON SSR**

### **Fase 1: Preparación y Estructura del Proyecto**

#### **INSTRUCCIONES DE EJECUCIÓN:**

1. **Crear backup completo** del proyecto original
2. **Confirmar** con el usuario antes de proceder
3. **Crear nuevo directorio** para el proyecto Angular
4. **Migrar assets** (imágenes, etc.) al nuevo proyecto
5. **Configurar entorno** de desarrollo

#### **TAREAS:**

- [ ] **Crear backup del proyecto original**

  - Crear carpeta `glow-skin-web-backup-[fecha]`
  - Copiar todos los archivos actuales
  - Documentar estructura original

- [ ] **Crear proyecto Angular 19 con SSR**

  - Inicializar proyecto con `ng new glow-skin-angular --ssr`
  - Configurar routing y lazy loading
  - Configurar Tailwind CSS en Angular
  - Configurar Google Fonts e Ionicons
  - Migrar carpeta `assets/` al nuevo proyecto

- [ ] **Reorganización de Archivos por Funcionalidad**

  - **Separar archivos por páginas:**

    - `src/app/pages/home/` - Página de inicio
    - `src/app/pages/precios/` - Página de precios
    - `src/app/pages/nosotros/` - Página nosotros
    - `src/app/pages/casos-reales/` - Página casos reales
    - `src/app/pages/blog/` - Listado de blog
    - `src/app/pages/blog-post/` - Entrada individual de blog
    - `src/app/pages/agendar/` - Página de agendamiento
    - `src/app/pages/confirmacion-pago/` - Confirmación de pago

  - **Separar archivos de estilos:**

    - `src/styles/global.css` - Estilos globales
    - `src/styles/components/` - Estilos de componentes
    - `src/styles/pages/` - Estilos específicos de páginas
    - `src/styles/utilities/` - Clases utilitarias

  - **Separar archivos JavaScript/TypeScript:**
    - `src/app/services/` - Servicios (WhatsApp, carruseles, etc.)
    - `src/app/components/` - Componentes reutilizables
    - `src/app/guards/` - Guards de navegación
    - `src/app/interceptors/` - Interceptores HTTP

- [ ] **Migración de Contenido HTML**
  - Convertir HTML actual a componentes Angular
  - Implementar routing entre páginas
  - Migrar estilos CSS a archivos separados
  - Migrar JavaScript a servicios y componentes

## 🎯 **TAREAS REORGANIZADAS POR PRIORIDAD**

### **Fase 2: Mejoras Críticas del Sitio Actual**

#### **INSTRUCCIONES DE EJECUCIÓN:**

1. **Crear backup** del archivo `index.html` actual
2. **Confirmar** con el usuario antes de proceder
3. **Realizar cambios** uno por uno
4. **Probar** cada funcionalidad después de cada cambio
5. **Documentar** modificaciones realizadas

#### **TAREAS:**

##### 1. **Correcciones Inmediatas**

- [ ] **Reseñas de Google - Logo de Sofia**

  - Cambiar la imagen del logo en las reseñas de Google por la foto de Sofia
  - Asegurar que la imagen sea un círculo perfecto (border-radius: 50%)
  - Usar la imagen: `assets/images/sofia/sofia nieto glow skin bq.png`

- [ ] **Carrusel de Reviews - Indicadores**
  - Agregar dots (indicadores) al carrusel de testimonios
  - Los dots deben ser clickeables para navegar entre reviews
  - Dot activo debe tener un estilo diferente
  - Mantener la funcionalidad automática existente

##### 2. **Navegación Mejorada**

- [ ] **Header con efecto blur mejorado**

  - Mantener efecto blur pero con color claro que permita ver elementos
  - Ajustar opacidad y transparencia para mejor legibilidad
  - Asegurar contraste adecuado entre texto y fondo

- [ ] **Menú móvil flotante**
  - Convertir menú dropdown en elemento flotante de pantalla completa
  - Fondo que permita lectura clara del contenido
  - Añadir animaciones y transiciones suaves
  - Mejorar estilos visuales con iconos, espaciado y tipografía
  - Implementar overlay con efecto de desenfoque

##### 3. **Widget de WhatsApp Mejorado**

- [ ] **Ancho máximo en mobile**: 80dvw (80% del viewport width)
- [ ] **Timing de aparición**: 15 segundos después del idle time del usuario
- [ ] **Comportamiento de cierre**:
  - Cerrar automáticamente después de 5 segundos de abrirse sola
  - Si el usuario la cierra manualmente, no volver a abrir sin acción del usuario
  - Mantener estado de "cerrado por usuario" en localStorage
- [ ] **Mejoras visuales**:
  - Animaciones más suaves
  - Mejor contraste en mobile
  - Responsive design optimizado

### **Fase 3: Separación de Páginas Independientes**

#### **INSTRUCCIONES DE EJECUCIÓN:**

1. **Crear backup** del proyecto actual
2. **Confirmar** con el usuario antes de proceder
3. **Crear archivos separados** para cada página
4. **Migrar contenido** sección por sección
5. **Probar** navegación entre páginas
6. **Verificar** que todas las funcionalidades funcionen

#### **TAREAS:**

- [ ] **Página de Inicio** (`index.html`) - Solo contenido principal
- [ ] **Página de Precios** (`precios.html`) - Lista completa de servicios y precios
- [ ] **Página Nosotros** (`nosotros.html`) - Información sobre Sofia y Glow Skin
- [ ] **Página Casos Reales** (`casos-reales.html`) - Galería de antes y después
- [ ] Actualizar navegación para enlazar a páginas separadas (no IDs)

### **Fase 4: Página "Nosotros" Completa**

#### **INSTRUCCIONES DE EJECUCIÓN:**

1. **Recopilar información** necesaria sobre Glow Skin y Sofia
2. **Confirmar** con el usuario el contenido a incluir
3. **Diseñar estructura** de la página
4. **Implementar contenido** sección por sección
5. **Probar** responsividad y funcionalidad

#### **TAREAS:**

- [ ] **Sección Glow Skin**

  - Historia y misión de Glow Skin
  - Valores y filosofía de la empresa
  - Diferenciales competitivos
  - Certificaciones y reconocimientos

- [ ] **Información de Ubicación**

  - Dirección completa en Barranquilla
  - Mapa interactivo (Google Maps)
  - Instrucciones de llegada
  - Estacionamiento disponible

- [ ] **Datos de Contacto**

  - Teléfono principal
  - WhatsApp de contacto
  - Email de contacto
  - Horarios de atención
  - Días de la semana disponibles

- [ ] **Información sobre Sofia Nieto**

  - Biografía profesional
  - Certificaciones y estudios
  - Experiencia en el campo
  - Especialidades
  - Filosofía de trabajo
  - Galería de fotos profesionales

- [ ] **Sección de Equipo**

  - Personal de apoyo (si aplica)
  - Certificaciones del equipo
  - Experiencia colectiva

- [ ] **Instalaciones**
  - Fotos del consultorio
  - Equipos y tecnología utilizada
  - Ambiente y comodidades
  - Medidas de higiene y seguridad

### **Fase 5: SEO y Optimización**

#### **INSTRUCCIONES DE EJECUCIÓN:**

1. **Analizar** palabras clave actuales
2. **Confirmar** con el usuario las palabras clave objetivo
3. **Implementar SEO** página por página
4. **Probar** con herramientas de SEO
5. **Optimizar** basado en resultados

#### **TAREAS:**

- [ ] **SEO General**

  - Meta tags apropiados para cada página
  - Optimización de imágenes
  - Tiempo de carga rápido
  - URLs amigables
  - Sitemap XML
  - Robots.txt

- [ ] **SEO Local**

  - Implementar Schema.org para negocio local
  - Datos estructurados para Glow Skin
  - Información de ubicación y contacto
  - Horarios de atención
  - Reseñas y calificaciones estructuradas
  - Palabras clave locales: "Barranquilla", "Colombia", "Caribe"

- [ ] **Palabras Clave por Tratamiento**
  - Limpieza facial: "limpieza facial barranquilla", "facial barranquilla"
  - Microneedling: "microneedling barranquilla", "inducción colágeno"
  - Peeling químico: "peeling químico barranquilla", "renovación celular"
  - Exosomas: "exosomas barranquilla", "regeneración celular"
  - PDRN: "PDRN barranquilla", "bio-regeneración"
  - Acné: "tratamiento acné barranquilla", "dermatología barranquilla"

### **Fase 6: Sección de Blog**

#### **INSTRUCCIONES DE EJECUCIÓN:**

1. **Definir estructura** del blog
2. **Confirmar** con el usuario el diseño y funcionalidades
3. **Crear templates** de blog
4. **Desarrollar contenido** para cada tratamiento
5. **Optimizar SEO** de cada entrada

#### **TAREAS:**

- [ ] **Template de Blog**

  - **Página de Listado** (`blog.html`)

    - Lista todos los artículos del blog
    - Mantener el mismo look & feel del Home
    - Diseño de cards para cada entrada
    - Paginación si es necesario
    - Categorías/tags

  - **Página de Entrada Individual** (`blog-post.html`)
    - Template para mostrar cada artículo completo
    - Mantener el mismo look & feel del Home
    - Navegación entre artículos
    - Compartir en redes sociales
    - Comentarios (opcional)

- [ ] **Contenido del Blog - Landing Pages por Tratamiento**
  - **Mínimo 1 publicación por cada tratamiento**
  - Formato landing page atractivo y optimizado para SEO
  - Títulos y textos persuasivos
  - Optimización SEO local con palabras clave específicas
  - **Estructura de cada publicación:**
    - Título principal optimizado
    - Introducción atractiva
    - Sección "¿Quién necesita este tratamiento?"
    - Sección "Resultados esperados"
    - Proceso paso a paso
    - Antes y después (imágenes)
    - Testimonios específicos
    - FAQ relacionadas
    - CTA para agendar
  - **Tratamientos a cubrir:**
    - Limpieza Facial Glow Skin
    - Limpieza Facial Anti-Acné
    - Tratamiento Anti-Acné Intensivo
    - Tratamiento Despigmentante
    - Tratamiento Regenerative +
    - Antiox Peel Pro
    - Porcelanización Facial
    - Microneedling + Exosomas
    - Protocolo PDRN
    - Glow Lips

### **Fase 7: Sistema de Agendamiento**

#### **INSTRUCCIONES DE EJECUCIÓN:**

1. **Definir flujo** de agendamiento
2. **Confirmar** con el usuario el proceso deseado
3. **Implementar** página de selección de servicios
4. **Integrar** Mercado Pago
5. **Probar** todo el flujo de pago

#### **TAREAS:**

- [ ] **Página de Agendamiento** (`agendar.html`)

  - Listar todos los servicios disponibles
  - Permitir selección de servicios
  - Mostrar precios de cada servicio
  - Funcionalidad de carrito de compras
  - Selección de fecha y hora
  - Integración con calendario

- [ ] **Integración Mercado Pago**

  - Configurar Mercado Pago como pasarela de pagos
  - Mostrar mensaje de seguridad: "Pagos seguros gestionados por Mercado Pago"
  - Logo de Mercado Pago visible
  - Proceso de checkout seguro
  - Confirmación de pago

- [ ] **Página de Confirmación de Pago**
  - Confirmar el pago realizado
  - **Sugerir pago restante** (si aplica)
  - **Recomendar otros servicios** relacionados
  - Botones para agendar más citas
  - Información de contacto

### **Fase 8: Consistencia Visual y Responsive**

#### **INSTRUCCIONES DE EJECUCIÓN:**

1. **Revisar** consistencia visual en todas las páginas
2. **Probar** en diferentes dispositivos
3. **Optimizar** responsive design
4. **Verificar** navegación en todas las páginas

#### **TAREAS:**

- [ ] **Consistencia Visual**

  - Mantener el mismo look & feel en todas las páginas
  - Usar la misma paleta de colores:
    - Fondo: `#FBF6F3`
    - Texto principal: `#5C3A21`
    - Texto secundario: `#7D5A44`
    - Botones primarios: `#7D5A44`
    - Botones secundarios: `#A5846E`

- [ ] **Responsive Design**

  - Asegurar que todas las nuevas páginas sean responsive
  - Optimizar para móviles, tablets y desktop
  - Menú móvil funcional en todas las páginas

- [ ] **Navegación**
  - Header consistente en todas las páginas
  - Footer con información de contacto
  - Breadcrumbs para navegación
  - Botón "Volver arriba"

### **Fase 9: Optimizaciones Finales**

#### **INSTRUCCIONES DE EJECUCIÓN:**

1. **Realizar testing** completo del sitio
2. **Optimizar performance**
3. **Configurar deployment**
4. **Configurar herramientas** de analytics y SEO

#### **TAREAS:**

- [ ] **Performance y Testing**

  - Optimización de imágenes
  - Compresión de archivos
  - Testing en diferentes dispositivos
  - Testing de velocidad de carga
  - Testing de funcionalidades

- [ ] **Deployment y Configuración**
  - Configurar dominio
  - Configurar SSL
  - Configurar analytics
  - Configurar Google Search Console
  - Configurar Google My Business

## 📋 **Estructura de Archivos Final (Angular)**

```
glow-skin-angular/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   ├── precios/
│   │   │   ├── nosotros/
│   │   │   ├── casos-reales/
│   │   │   ├── blog/
│   │   │   ├── blog-post/
│   │   │   ├── agendar/
│   │   │   └── confirmacion-pago/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   ├── carousel/
│   │   │   └── whatsapp-widget/
│   │   ├── services/
│   │   │   ├── carousel.service.ts
│   │   │   ├── whatsapp.service.ts
│   │   │   └── booking.service.ts
│   │   └── shared/
│   ├── styles/
│   │   ├── global.css
│   │   ├── components/
│   │   ├── pages/
│   │   └── utilities/
│   └── assets/
│       └── images/
├── angular.json
├── package.json
└── README.md
```

## 🚀 **ORDEN DE EJECUCIÓN RECOMENDADO**

### **Semana 1-2: Migración Angular**

1. Crear proyecto Angular 19 con SSR
2. Configurar estructura de archivos
3. Migrar contenido HTML a componentes

### **Semana 3: Correcciones Críticas**

4. Corregir logo de Sofia en reviews
5. Agregar dots al carrusel
6. Mejorar navegación móvil
7. Optimizar widget de WhatsApp

### **Semana 4: Páginas Separadas**

8. Crear páginas independientes
9. Implementar página "Nosotros" completa
10. Configurar routing

### **Semana 5: SEO y Blog**

11. Implementar SEO local
12. Crear template de blog
13. Desarrollar contenido del blog

### **Semana 6: Sistema de Agendamiento**

14. Implementar página de agendamiento
15. Integrar Mercado Pago
16. Crear página de confirmación

### **Semana 7: Optimizaciones**

17. Testing y optimizaciones
18. Deployment y configuración final

## 💡 **Notas Importantes**

- **Migración Angular**: Priorizar la migración antes de nuevas funcionalidades
- **SEO Local**: Implementar desde el inicio para mejor posicionamiento
- **Responsive**: Asegurar que todo funcione perfectamente en móviles
- **Performance**: Mantener tiempos de carga rápidos
- **Testing**: Probar cada funcionalidad antes de continuar
- **Backup**: Siempre crear backup antes de cambios importantes

---

**Estado del Proyecto:** Migración a Angular 19  
**Última actualización:** Enero 2025  
**Responsable:** Equipo de desarrollo
