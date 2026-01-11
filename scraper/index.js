// scraper/index.js
const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
const fs = require('fs');
const path = require('path');

// Add stealth plugin
chromium.use(stealth);

const TARGET_URL = 'https://powerpacks.gamestop.com/packs';
const OUTPUT_FILE = path.join(__dirname, '..', 'site_content_stealth.html');

async function randomDelay(min = 1000, max = 3000) {
    const delay = Math.floor(Math.random() * (max - min) + min);
    await new Promise(resolve => setTimeout(resolve, delay));
}

(async () => {
    console.log('Launching stealth browser...');
    const browser = await chromium.launch({
        headless: false, // Important for evasion, though visible
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            '--window-size=1920,1080',
        ]
    });

    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        viewport: { width: 1920, height: 1080 },
        locale: 'en-US',
        timezoneId: 'America/Chicago',
    });

    const page = await context.newPage();

    try {
        console.log(`Navigating to ${TARGET_URL}...`);

        // Go to page
        await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Random mouse movements to simulate human
        console.log('Simulating human interaction...');
        await page.mouse.move(100, 100);
        await randomDelay(500, 1500);
        await page.mouse.move(200, 200);
        await randomDelay(200, 800);
        await page.mouse.wheel(0, 500); // Scroll down
        await randomDelay(1000, 2000);

        // Check if we hit a challenge or 403
        const title = await page.title();
        console.log(`Page Title: ${title}`);

        // Get content
        const content = await page.content();

        if (content.includes('Access Denied') || content.includes('403 Forbidden')) {
            console.error('STILL BLOCKED: Detected 403 or Access Denied.');
        } else {
            console.log('SUCCESS! Saving content...');
            fs.writeFileSync(OUTPUT_FILE, content);
            console.log(`Saved to ${OUTPUT_FILE}`);

            // Take a screenshot for verification
            await page.screenshot({ path: path.join(__dirname, 'screenshot.png') });
        }

    } catch (e) {
        console.error('Error during scraping:', e);
    } finally {
        // Keep open for a bit to see result if local
        await randomDelay(2000, 3000);
        await browser.close();
    }
})();
