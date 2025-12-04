import { useEffect } from "react";

interface YandexMetrikaProps {
  counterId?: string;
}

const YandexMetrika = ({ counterId = "XXXXXXXXX" }: YandexMetrikaProps) => {
  useEffect(() => {
    // Яндекс.Метрика
    if (typeof window !== "undefined" && counterId !== "XXXXXXXXX") {
      (function(m: any, e: any, t: any, r: any, i: any, k?: any, a?: any) {
        m[i] = m[i] || function() { 
          (m[i].a = m[i].a || []).push(arguments) 
        };
        m[i].l = 1 * new Date().getTime();
        
        for (let j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) { return; }
        }
        
        k = e.createElement(t);
        a = e.getElementsByTagName(t)[0];
        k.async = 1;
        k.src = r;
        a?.parentNode?.insertBefore(k, a);
      })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      (window as any).ym(counterId, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        ecommerce: "dataLayer"
      });
    }
  }, [counterId]);

  if (counterId === "XXXXXXXXX") {
    return null;
  }

  return (
    <noscript>
      <div>
        <img 
          src={`https://mc.yandex.ru/watch/${counterId}`} 
          style={{ position: "absolute", left: "-9999px" }} 
          alt="" 
        />
      </div>
    </noscript>
  );
};

export default YandexMetrika;
