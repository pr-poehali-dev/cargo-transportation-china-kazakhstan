// Скрипт для генерации sitemap.xml
// Запускается автоматически после билда

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Импортируем данные страниц
// Примечание: в production используйте compiled версии
const DOMAIN = 'https://chinakaz.kz';

// Список всех страниц
const pages = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  
  // Страницы услуг (700 страниц)
  { url: '/gruzoperevozki-kitaj-rossiya', priority: 0.9, changefreq: 'weekly' },
  { url: '/gruzoperevozki-kitaj-kazakhstan', priority: 0.9, changefreq: 'weekly' },
  
  // Короткие страницы маршрутов
  { url: '/route/russia-iran', priority: 0.8, changefreq: 'weekly' },
  { url: '/route/china-kazakhstan', priority: 0.8, changefreq: 'weekly' },
  { url: '/route/caspian-sea', priority: 0.8, changefreq: 'weekly' },
  
  // Добавьте здесь все остальные 700 страниц
  // Или импортируйте из servicePagesData.map(p => ({ url: `/${p.slug}`, ... }))
];

// Генерируем XML
const generateSitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  pages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}${page.url}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};

// Сохраняем sitemap
const saveSitemap = () => {
  const sitemap = generateSitemap();
  const publicDir = path.resolve(__dirname, '../public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  
  fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
  console.log(`✅ Sitemap generated: ${sitemapPath}`);
  console.log(`📄 Total URLs: ${pages.length}`);
};

saveSitemap();
