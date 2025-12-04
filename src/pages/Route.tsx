import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { getRouteBySlug } from "@/data/routes";

const Route = () => {
  const { slug } = useParams<{ slug: string }>();
  const routeData = slug ? getRouteBySlug(slug) : null;

  useEffect(() => {
    if (routeData) {
      document.title = routeData.metaTitle;
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', routeData.metaDescription);
    }
  }, [routeData]);

  if (!routeData) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-16 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto min-h-[400px]">
                  <img 
                    src={routeData.image} 
                    alt={routeData.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div className="space-y-6">
                    <h1 className="text-3xl lg:text-4xl font-bold">{routeData.title}</h1>
                    
                    <div className="space-y-4 text-muted-foreground">
                      <p className="leading-relaxed">{routeData.description}</p>
                      <p className="leading-relaxed">{routeData.timing}</p>
                      <p className="leading-relaxed font-semibold text-foreground">{routeData.pricing}</p>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h2 className="font-semibold text-xl mb-3">{routeData.routeTitle}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {routeData.routeDetails}
                      </p>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-8 bg-[#4DB8AC] hover:bg-[#3da598] text-lg h-14">
                    Заказать расчет
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Преимущества маршрута</h2>
                <ul className="space-y-4">
                  {routeData.advantages.map((advantage, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                      <span>{advantage}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-8 bg-primary/5">
                <h2 className="text-2xl font-bold mb-6">Получить консультацию</h2>
                <div className="space-y-4 text-muted-foreground mb-6">
                  <p>Наши специалисты помогут подобрать оптимальное решение для вашего груза.</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" className="text-primary" size={20} />
                      <span className="font-semibold text-foreground">+7 (777) 123-45-67</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" className="text-primary" size={20} />
                      <span className="font-semibold text-foreground">info@chinakaz.kz</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Clock" className="text-primary" size={20} />
                      <span>Ответим в течение 15 минут</span>
                    </div>
                  </div>
                </div>
                <Button variant="default" size="lg" className="w-full">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Написать в WhatsApp
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Route;
