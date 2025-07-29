import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));

  // Detectar ambiente: desarrollo vs producción
  const isProduction = process.env['NODE_ENV'] === 'production';

  // En Amplify, el servidor busca en diferentes rutas
  let browserDistFolder;
  if (isProduction) {
    // Intentar diferentes rutas en producción
    const possiblePaths = [
      resolve(serverDistFolder, '../../static'), // .amplify-hosting/static
      resolve(serverDistFolder, '../browser'), // /var/browser
      resolve(serverDistFolder, '../../browser'), // /var/browser (alternativa)
      '/var/browser', // Ruta directa
      '/var/static', // Ruta directa
    ];

    // Usar la primera ruta que existe
    for (const path of possiblePaths) {
      try {
        require('fs').accessSync(path);
        browserDistFolder = path;
        break;
      } catch (e) {
        // Continuar con la siguiente ruta
      }
    }

    // Si no se encontró ninguna, usar la ruta por defecto
    if (!browserDistFolder) {
      browserDistFolder = resolve(serverDistFolder, '../../static');
    }
  } else {
    browserDistFolder = resolve(serverDistFolder, '../browser'); // Local
  }

  console.log('Server Dist Folder:', serverDistFolder);
  console.log('Browser Dist Folder:', browserDistFolder);
  console.log('Is Production:', isProduction);

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.sendFile(join(browserDistFolder, 'index.html'));
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
