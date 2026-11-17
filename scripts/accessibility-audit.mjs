import { createRequire } from 'node:module';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');
const baseUrl = 'http://127.0.0.1:4200';

const routes = [
  { path: '/', requiresDirector: false },
  { path: '/ingresar', requiresDirector: false },
  { path: '/registro', requiresDirector: false },
  { path: '/registro/verificar', requiresDirector: false },
  { path: '/app/coro', requiresDirector: true },
  { path: '/app/conciertos', requiresDirector: true },
  { path: '/app/formaciones', requiresDirector: true },
];

const syntheticDirector = {
  id: 999999,
  displayName: 'Accessibility Audit',
  email: 'accessibility-audit@example.invalid',
};

let serverReady = false;

for (let attempt = 0; attempt < 90; attempt += 1) {
  try {
    const response = await fetch(baseUrl);
    if (response.ok) {
      serverReady = true;
      break;
    }
  } catch {
    await delay(1000);
  }
}

if (!serverReady) {
  throw new Error(`Angular no respondió en ${baseUrl}`);
}

const browser = await chromium.launch({ headless: true });
const failures = [];

try {
  const context = await browser.newContext();

  await context.route('**/api/auth/me', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(syntheticDirector),
      });
      return;
    }

    await route.continue();
  });

  const page = await context.newPage();

  for (const route of routes) {
    const url = `${baseUrl}${route.path}`;

    try {
      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });

      await page.waitForURL((currentUrl) => currentUrl.pathname === route.path, { timeout: 15000 });

      await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});

      await page.addScriptTag({ path: axePath });

      const results = await page.evaluate(async () => {
        return window.axe.run(document, {
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
          },
        });
      });

      console.log(`\nPantalla: ${route.path}`);
      console.log(
        route.requiresDirector ? 'Acceso: sesión sintética de auditoría' : 'Acceso: ruta pública',
      );

      if (route.requiresDirector) {
        console.log('Alcance: sesión simulada; las API de dominio no están simuladas.');
      }

      console.log(`Violaciones: ${results.violations.length}`);

      for (const violation of results.violations) {
        console.error(`[${violation.impact ?? 'sin impacto'}] ${violation.id}: ${violation.help}`);

        for (const node of violation.nodes) {
          console.error(`  Elemento: ${node.target.join(', ')}`);
        }

        failures.push({
          route: route.path,
          id: violation.id,
        });
      }
    } catch (error) {
      console.error(`Error auditando ${route.path}:`, error);
      failures.push({
        route: route.path,
        id: 'audit-error',
      });
    }
  }

  await context.close();
} finally {
  await browser.close();
}

if (failures.length > 0) {
  console.error('\nLa auditoría encontró problemas:');
  console.error(JSON.stringify(failures, null, 2));
  throw new Error(`Auditoría de accesibilidad fallida: ${failures.length} problemas.`);
}

console.log('\nAuditoría axe-core completada sin violaciones en las rutas recorridas.');
