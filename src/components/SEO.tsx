import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const SEO = ({ title, description, keywords, ogImage, canonicalUrl }: SEOProps) => {
  const location = useLocation();
  const currentUrl = `https://chinakaz.kz${location.pathname}`;
  const defaultOgImage = "https://cdn.poehali.dev/projects/d443d10d-90c9-4b64-94fe-bbf3a1f2fa6e/files/553293ee-bd76-45d0-908c-bd81116b495a.jpg";

  useEffect(() => {
    // Обновляем title
    document.title = title;

    // Обновляем meta description
    updateMetaTag("name", "description", description);

    // Обновляем keywords (если указаны)
    if (keywords) {
      updateMetaTag("name", "keywords", keywords);
    }

    // Open Graph теги для соцсетей
    updateMetaTag("property", "og:title", title);
    updateMetaTag("property", "og:description", description);
    updateMetaTag("property", "og:url", canonicalUrl || currentUrl);
    updateMetaTag("property", "og:image", ogImage || defaultOgImage);
    updateMetaTag("property", "og:type", "website");

    // Twitter Card
    updateMetaTag("name", "twitter:card", "summary_large_image");
    updateMetaTag("name", "twitter:title", title);
    updateMetaTag("name", "twitter:description", description);
    updateMetaTag("name", "twitter:image", ogImage || defaultOgImage);

    // Canonical URL
    updateLinkTag("canonical", canonicalUrl || currentUrl);

    // Robots
    updateMetaTag("name", "robots", "index, follow");

  }, [title, description, keywords, ogImage, canonicalUrl, currentUrl]);

  return null;
};

// Вспомогательная функция для обновления meta тегов
const updateMetaTag = (attribute: string, attributeValue: string, content: string) => {
  let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
  
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }
  
  element.setAttribute("content", content);
};

// Вспомогательная функция для обновления link тегов
const updateLinkTag = (rel: string, href: string) => {
  let element = document.querySelector(`link[rel="${rel}"]`);
  
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  
  element.setAttribute("href", href);
};

export default SEO;
