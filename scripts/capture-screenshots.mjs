import puppeteer from 'puppeteer-core';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const screenshotsDir = path.resolve(__dirname, '../docs/screenshots');

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 }
  });

  const page = await browser.newPage();

  // 1. Landing Page
  console.log('Capturing Landing Page...');
  await page.goto('http://localhost:8443/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotsDir, 'landing-page.png') });

  // 2. Onboarding Page
  console.log('Capturing Onboarding Page...');
  await page.goto('http://localhost:8443/onboarding', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotsDir, 'onboarding.png') });

  // 3. Assessment Page
  console.log('Capturing Assessment Page...');
  await page.goto('http://localhost:8443/assessment', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotsDir, 'assessment.png') });

  // 4. Sign in
  console.log('Logging in...');
  await page.goto('http://localhost:8443/signin', { waitUntil: 'networkidle0' });
  await page.waitForSelector('input[type="email"]');
  await page.type('input[type="email"]', 'alex@example.com');
  await page.type('input[type="password"]', 'Password123!');
  await page.click('button[type="submit"]');
  await new Promise(r => setTimeout(r, 2000));

  // 5. Dashboard
  console.log('Capturing Dashboard...');
  await page.goto('http://localhost:8443/app', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(screenshotsDir, 'dashboard.png') });

  // 6. Adaptive Roadmap
  console.log('Capturing Roadmap...');
  await page.goto('http://localhost:8443/app/roadmap', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(screenshotsDir, 'roadmap.png') });

  // 7. Interactive Learn / Topic
  console.log('Capturing Interactive Lesson...');
  await page.goto('http://localhost:8443/app/learn', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(screenshotsDir, 'interactive-learning.png') });

  // 8. Practice Center
  console.log('Capturing Practice Center...');
  await page.goto('http://localhost:8443/app/practice', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(screenshotsDir, 'practice-center.png') });

  // 9. Projects & Rubric
  console.log('Capturing Projects & Rubrics...');
  await page.goto('http://localhost:8443/app/projects', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(screenshotsDir, 'projects-rubric.png') });

  // 10. Analytics
  console.log('Capturing Analytics...');
  await page.goto('http://localhost:8443/app/analytics', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(screenshotsDir, 'analytics.png') });

  // 11. Curated Resources
  console.log('Capturing Resources Explorer...');
  await page.goto('http://localhost:8443/app/resources', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(screenshotsDir, 'resources.png') });

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error running script:', err);
  process.exit(1);
});

