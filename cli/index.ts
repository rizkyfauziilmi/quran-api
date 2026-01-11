import puppeteer from 'puppeteer';
import { scrapeKemenagQuran } from './lib/kemenag-scraper';

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // get transliteration and indonesia translation from Kemenag Quran
  await scrapeKemenagQuran(browser);

  await browser.close();
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
