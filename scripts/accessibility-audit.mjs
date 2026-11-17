import { createRequire } from 'node:module';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');
const baseUrl = 'http://127.0.0.1:4200';
const routes = [
  '/',
  '/ingresar',
  '/registro',
  '/registro/verificar',
  '/app/coro',
  '/app/conciertos',
  '/app/formaciones',
];

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
  throw new Error('Angular no respondió en http://127.0.0.1:4200');
}

const browser = await chromium.launch({ headless: true });
const failures = [];

try {
  const page = await browser.newPage();

  for (const route of routes) {
    const url = `${baseUrl}${route}`;

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.addScriptTag({ path: axePath });

      const results = await page.evaluate(async () => {
        return window.axe.run(document, {
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
          },
        });
      });

      console.log(`\nPantalla: ${route}`);
      console.log(`Violaciones: ${results.violations.length}`);

      for (const violation of results.violations) {
        console.error(`[${violation.impact ?? 'sin impacto'}] ${violation.id}: ${violation.help}`);
        for (const node of violation.nodes) {
          console.error(`  Elemento: ${node.target.join(', ')}`);
        }
        failures.push({ route, id: violation.id });
      }
    } catch (error) {
      console.error(`Error auditando ${route}:`, error);
      failures.push({ route, id: 'audit-error' });
    }
  }
} finally {
  await browser.close();
}

if (failures.length > 0) {
  console.error('\nLa auditoría encontró problemas:');
  console.error(JSON.stringify(failures, null, 2));
  throw new Error(`Auditoría de accesibilidad fallida: ${failures.length} problemas.`);
}

console.log('\nAuditoría axe-core completada sin violaciones.');
