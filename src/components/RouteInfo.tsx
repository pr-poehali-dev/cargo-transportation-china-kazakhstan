import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { Link } from "react-router-dom";
import { routesData } from "@/data/routes";

const RouteInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Популярные направления</h2>
        
        <div className="space-y-8 max-w-6xl mx-auto">
          {routesData.map((route, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <img 
                    src={route.image} 
                    alt={route.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">{route.title}</h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {route.description}
                    </p>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {route.timing}
                    </p>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {route.pricing}
                    </p>
                    
                    <div className="pt-4">
                      <h4 className="font-semibold text-lg mb-2">{route.routeTitle}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {route.routeDetails}
                      </p>
                    </div>
                  </div>
                  
                  <Link to={`/route/${route.slug}`} className="w-full">
                    <Button className="w-full mt-6 bg-[#4DB8AC] hover:bg-[#3da598] text-lg h-12">
                      Подробнее о маршруте
                      <Icon name="ArrowRight" size={20} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => setIsExpanded(!isExpanded)}
            className="min-w-64"
          >
            <Icon name="Plus" size={20} className="mr-2" />
            ЧИТАТЬ ДАЛЕЕ ОБ АВТОПЕРЕВОЗКАХ
          </Button>
          
          {isExpanded && (
            <Card className="mt-8 p-8 text-left max-w-4xl mx-auto animate-fade-in-up">
              <h3 className="text-2xl font-bold mb-4">Дополнительная информация об автоперевозках</h3>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Автомобильные перевозки грузов являются одним из самых гибких и оперативных способов 
                  доставки товаров между странами. Наша компания предоставляет полный спектр услуг по 
                  организации международных автоперевозок.
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-lg">Преимущества автоперевозок:</h4>
                  <ul className="space-y-2 ml-6">
                    {[
                      "Доставка «от двери до двери» без дополнительных перегрузок",
                      "Гибкий график отправки и возможность срочной доставки",
                      "Оптимальное соотношение цены и скорости доставки",
                      "Возможность отслеживания груза в режиме реального времени",
                      "Минимальные требования к упаковке груза"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-lg">Типы автотранспорта:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: "Тентованные фуры", desc: "Для общих грузов, возможность боковой загрузки" },
                      { name: "Рефрижераторы", desc: "Для грузов, требующих температурного режима" },
                      { name: "Открытые платформы", desc: "Для негабаритных и тяжеловесных грузов" },
                      { name: "Изотермы", desc: "Для грузов, требующих поддержания температуры" }
                    ].map((type, i) => (
                      <div key={i} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                        <Icon name="Truck" className="text-primary flex-shrink-0" size={24} />
                        <div>
                          <div className="font-semibold text-foreground">{type.name}</div>
                          <div className="text-sm">{type.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="pt-4">
                  Мы работаем с проверенными перевозчиками, имеющими все необходимые лицензии и разрешения 
                  для международных перевозок. Все грузы застрахованы и отслеживаются на всем протяжении маршрута.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default RouteInfo;