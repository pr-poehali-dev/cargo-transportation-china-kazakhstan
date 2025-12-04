// Конфигурация для генерации статических HTML страниц (SSG)
// Используется для улучшения SEO на статических хостингах

import { servicePagesData } from './src/data/servicePages';
import { routesData } from './src/data/routes';

// Генерируем список всех URL для prerender
const generateRoutes = () => {
  const routes = [
    '/', // Главная страница
  ];

  // Добавляем все страницы услуг (gruzoperevozki-*)
  servicePagesData.forEach(page => {
    routes.push(`/${page.slug}`);
  });

  // Добавляем все короткие страницы маршрутов (route/*)
  routesData.forEach(route => {
    routes.push(`/route/${route.slug}`);
  });

  return routes;
};

export default {
  routes: generateRoutes(),
  // Опции для оптимизации
  options: {
    removeScriptTags: false, // Оставляем JS для интерактивности
    removeStyleTags: false,  // Оставляем CSS
    minifyHtml: true,        // Минифицируем HTML
  }
};
