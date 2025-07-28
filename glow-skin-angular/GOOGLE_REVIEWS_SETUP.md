# Configuración de Google Reviews para Glow Skin

Este documento explica cómo configurar la integración con Google Places API para mostrar las reviews de Google de Glow Skin en el sitio web.

## Prerrequisitos

1. Una cuenta de Google Cloud Platform
2. El negocio "Glow Skin" debe estar registrado en Google My Business/Google Business Profile
3. Acceso a la consola de Google Cloud Platform

## Pasos de Configuración

### 1. Crear un proyecto en Google Cloud Platform

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Asegúrate de que la facturación esté habilitada

### 2. Habilitar Google Places API

1. En la consola de Google Cloud, ve a "APIs y servicios" > "Biblioteca"
2. Busca "Places API"
3. Haz clic en "Places API" y luego en "Habilitar"

### 3. Crear credenciales (API Key)

1. Ve a "APIs y servicios" > "Credenciales"
2. Haz clic en "Crear credenciales" > "Clave de API"
3. Copia la clave generada

### 4. Restringir la API Key (Recomendado)

1. En la página de credenciales, haz clic en la API Key que creaste
2. En "Restricciones de aplicación", selecciona "Sitios web"
3. Agrega los dominios donde se usará la API:
   - `localhost` (para desarrollo)
   - Tu dominio de producción
4. En "Restricciones de API", selecciona "Places API"

### 5. Obtener el Place ID de Glow Skin

#### Opción A: Usando Google Maps

1. Ve a [Google Maps](https://maps.google.com)
2. Busca "Glow Skin Barranquilla"
3. Haz clic en el resultado
4. En la URL, copia el Place ID (es una cadena larga después de `place_id=`)

#### Opción B: Usando Google Places API

1. Ve a [Google Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Busca "Glow Skin Barranquilla"
3. Copia el Place ID del resultado

### 6. Configurar las variables de entorno

Edita el archivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  googlePlacesApiKey: "TU_API_KEY_AQUI",
  glowSkinPlaceId: "TU_PLACE_ID_AQUI",
  googlePlacesApiUrl: "https://maps.googleapis.com/maps/api/place",
};
```

### 7. Crear environment.prod.ts para producción

Crea el archivo `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  googlePlacesApiKey: "TU_API_KEY_PRODUCCION",
  glowSkinPlaceId: "TU_PLACE_ID_AQUI",
  googlePlacesApiUrl: "https://maps.googleapis.com/maps/api/place",
};
```

## Uso del Componente

El componente `GoogleReviewsComponent` se puede usar en cualquier parte de la aplicación:

```html
<app-google-reviews></app-google-reviews>
```

## Características del Componente

- **Carga automática**: Las reviews se cargan automáticamente al inicializar el componente
- **Estados de carga**: Muestra un spinner mientras carga las reviews
- **Manejo de errores**: Muestra un mensaje de error si no se pueden cargar las reviews
- **Diseño responsivo**: Se adapta a diferentes tamaños de pantalla
- **Límite de reviews**: Muestra solo las 5 reviews más recientes
- **Enlaces a Google**: Incluye enlaces para ver todas las reviews en Google Maps

## Estructura de Datos

### GoogleReview Interface

```typescript
interface GoogleReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}
```

### GooglePlaceDetails Interface

```typescript
interface GooglePlaceDetails {
  place_id: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
  formatted_address: string;
  formatted_phone_number?: string;
  website?: string;
}
```

## Métodos del Servicio

- `getPlaceDetails()`: Obtiene todos los detalles del lugar
- `getReviews()`: Obtiene solo las reviews
- `getBusinessInfo()`: Obtiene información básica (rating, total de reviews)
- `generateStars(rating)`: Genera estrellas HTML basado en el rating
- `formatRelativeTime(time)`: Formatea la fecha relativa

## Limitaciones de la API

- **Cuotas**: Google Places API tiene límites de uso diario
- **Reviews limitadas**: Solo se pueden obtener las reviews más recientes (hasta 5)
- **Autenticación**: Requiere API Key válida
- **CORS**: Las llamadas deben hacerse desde el servidor o usar proxy

## Solución de Problemas

### Error: "REQUEST_DENIED"

- Verifica que la API Key sea correcta
- Asegúrate de que Places API esté habilitada
- Revisa las restricciones de la API Key

### Error: "NOT_FOUND"

- Verifica que el Place ID sea correcto
- Asegúrate de que el negocio esté verificado en Google

### Error: "OVER_QUERY_LIMIT"

- Has excedido el límite de consultas diarias
- Considera implementar caché para las reviews

### Error de CORS

- Las llamadas directas desde el navegador pueden fallar
- Considera usar un proxy o hacer las llamadas desde el servidor

## Costos

- **Places API**: $17 por 1000 consultas
- **Place Details**: $17 por 1000 consultas
- **Text Search**: $5 por 1000 consultas

## Seguridad

- **Nunca expongas tu API Key** en el código del cliente
- **Usa restricciones** en tu API Key
- **Considera usar un proxy** para las llamadas a la API
- **Monitorea el uso** de la API en Google Cloud Console

## Recursos Adicionales

- [Google Places API Documentation](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Google My Business](https://business.google.com/)
- [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
