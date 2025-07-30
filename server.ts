import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { existsSync } from 'node:fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));

  // Detectar ambiente: desarrollo vs producción
  const isProduction = process.env['NODE_ENV'] === 'production';

  // Función para verificar si una ruta existe
  function pathExists(path: string): boolean {
    try {
      return existsSync(path);
    } catch (e) {
      return false;
    }
  }

  // En producción, buscar en diferentes rutas posibles
  let browserDistFolder: string = '';
  if (isProduction) {
    // Intentar diferentes rutas en producción
    const possiblePaths = [
      // Para AWS Amplify y otros servicios cloud
      resolve(serverDistFolder, '../browser'), // dist/glow-skin-angular/browser
      resolve(serverDistFolder, '../../browser'), // browser (si está en raíz)
      resolve(serverDistFolder, '../../static'), // .amplify-hosting/static
      resolve(serverDistFolder, '../../../browser'), // dist/browser
      '/var/browser', // Ruta directa para algunos servicios
      '/app/dist/glow-skin-angular/browser', // Ruta completa en containers
      '/workspace/dist/glow-skin-angular/browser', // Ruta de workspace
      // Rutas adicionales para diferentes entornos
      process.cwd() + '/dist/glow-skin-angular/browser',
      process.cwd() + '/browser',
    ];

    console.log('Buscando archivos del browser en las siguientes rutas:');
    
    // Usar la primera ruta que existe
    for (const path of possiblePaths) {
      console.log(`  Probando: ${path}`);
      if (pathExists(path) && pathExists(join(path, 'index.html'))) {
        browserDistFolder = path;
        console.log(`  ✓ Encontrado en: ${path}`);
        break;
      } else {
        console.log(`  ✗ No encontrado en: ${path}`);
      }
    }

    // Si no se encontró ninguna, usar la ruta por defecto y mostrar error detallado
    if (!browserDistFolder) {
      browserDistFolder = resolve(serverDistFolder, '../browser');
      console.error('❌ No se encontraron archivos del browser en ninguna ruta!');
      console.error('Usando ruta por defecto:', browserDistFolder);
      console.error('Directorio actual del servidor:', serverDistFolder);
      console.error('Directorio de trabajo:', process.cwd());
    }
  } else {
    // Desarrollo local
    browserDistFolder = resolve(serverDistFolder, '../browser');
  }

  console.log('=== CONFIGURACIÓN DEL SERVIDOR ===');
  console.log('Server Dist Folder:', serverDistFolder);
  console.log('Browser Dist Folder:', browserDistFolder);
  console.log('Is Production:', isProduction);
  console.log('Index.html existe:', pathExists(join(browserDistFolder, 'index.html')));
  console.log('===================================');

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    const indexPath = join(browserDistFolder, 'index.html');
    
    if (!pathExists(indexPath)) {
      console.error(`❌ Error: No se puede encontrar index.html en: ${indexPath}`);
      res.status(500).send(`
        <h1>Error del Servidor</h1>
        <p>No se puede encontrar el archivo index.html</p>
        <p>Ruta buscada: ${indexPath}</p>
        <p>Directorio del servidor: ${serverDistFolder}</p>
        <p>Directorio de trabajo: ${process.cwd()}</p>
      `);
      return;
    }
    
    res.sendFile(indexPath);
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
