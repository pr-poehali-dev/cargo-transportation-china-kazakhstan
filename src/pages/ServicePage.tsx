import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";
import { getServicePageBySlug } from "@/data/servicePages";

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const pageData = slug ? getServicePageBySlug(slug) : null;

  if (!pageData) {
    return <Navigate to="/" replace />;
  }

  // Генерируем keywords из контента
  const keywords = [
    pageData.h1.toLowerCase(),
    ...pageData.advantages.slice(0, 3).map(a => a.toLowerCase()),
    "грузоперевозки", "логистика", "доставка грузов"
  ].join(", ");

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={pageData.metaTitle}
        description={pageData.metaDescription}
        keywords={keywords}
        ogImage={pageData.heroImage}
        canonicalUrl={`https://chinakaz.kz/${pageData.slug}`}
      />
      <Header />
      
      {/* Hero секция */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-5xl font-bold">{pageData.h1}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {pageData.heroDescription}
              </p>
              
              <div className="space-y-3">
                {pageData.advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span>{advantage}</span>
                  </div>
                ))}
              </div>
              
              <Button size="lg" className="bg-[#4DB8AC] hover:bg-[#3da598] text-lg h-14">
                <Icon name="Calculator" size={20} className="mr-2" />
                Рассчитать стоимость
              </Button>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={pageData.heroImage} 
                alt={pageData.h1}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Блок Автоперевозки */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="overflow-hidden shadow-xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto min-h-[400px] order-2 lg:order-1">
                  <img 
                    src={pageData.transport.auto.image} 
                    alt={pageData.transport.auto.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-between order-1 lg:order-2">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Icon name="Truck" className="text-primary" size={32} />
                      <h2 className="text-3xl font-bold">{pageData.transport.auto.title}</h2>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {pageData.transport.auto.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <Icon name="Clock" className="text-primary mb-2" size={24} />
                        <div className="font-semibold">Сроки</div>
                        <div className="text-sm text-muted-foreground">{pageData.transport.auto.timing}</div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <Icon name="DollarSign" className="text-primary mb-2" size={24} />
                        <div className="font-semibold">Стоимость</div>
                        <div className="text-sm text-muted-foreground">{pageData.transport.auto.price}</div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="font-semibold mb-2 flex items-center gap-2">
                        <Icon name="Route" className="text-primary" size={20} />
                        Маршрут
                      </div>
                      <p className="text-sm text-muted-foreground">{pageData.transport.auto.route}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-semibold">Особенности:</div>
                      <ul className="space-y-2">
                        {pageData.transport.auto.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6 bg-[#4DB8AC] hover:bg-[#3da598]">
                    Заказать автоперевозку
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Блок ЖД перевозки */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="overflow-hidden shadow-xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Icon name="Train" className="text-primary" size={32} />
                      <h2 className="text-3xl font-bold">{pageData.transport.railway.title}</h2>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {pageData.transport.railway.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <Icon name="Clock" className="text-primary mb-2" size={24} />
                        <div className="font-semibold">Сроки</div>
                        <div className="text-sm text-muted-foreground">{pageData.transport.railway.timing}</div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <Icon name="DollarSign" className="text-primary mb-2" size={24} />
                        <div className="font-semibold">Стоимость</div>
                        <div className="text-sm text-muted-foreground">{pageData.transport.railway.price}</div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="font-semibold mb-2 flex items-center gap-2">
                        <Icon name="Route" className="text-primary" size={20} />
                        Маршрут
                      </div>
                      <p className="text-sm text-muted-foreground">{pageData.transport.railway.route}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-semibold">Особенности:</div>
                      <ul className="space-y-2">
                        {pageData.transport.railway.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6 bg-[#4DB8AC] hover:bg-[#3da598]">
                    Заказать ЖД перевозку
                  </Button>
                </div>
                
                <div className="relative h-64 lg:h-auto min-h-[400px]">
                  <img 
                    src={pageData.transport.railway.image} 
                    alt={pageData.transport.railway.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Блок Авиаперевозки */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="overflow-hidden shadow-xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto min-h-[400px] order-2 lg:order-1">
                  <img 
                    src={pageData.transport.air.image} 
                    alt={pageData.transport.air.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-between order-1 lg:order-2">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Icon name="Plane" className="text-primary" size={32} />
                      <h2 className="text-3xl font-bold">{pageData.transport.air.title}</h2>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {pageData.transport.air.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <Icon name="Clock" className="text-primary mb-2" size={24} />
                        <div className="font-semibold">Сроки</div>
                        <div className="text-sm text-muted-foreground">{pageData.transport.air.timing}</div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <Icon name="DollarSign" className="text-primary mb-2" size={24} />
                        <div className="font-semibold">Стоимость</div>
                        <div className="text-sm text-muted-foreground">{pageData.transport.air.price}</div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="font-semibold mb-2 flex items-center gap-2">
                        <Icon name="Route" className="text-primary" size={20} />
                        Маршрут
                      </div>
                      <p className="text-sm text-muted-foreground">{pageData.transport.air.route}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-semibold">Особенности:</div>
                      <ul className="space-y-2">
                        {pageData.transport.air.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6 bg-[#4DB8AC] hover:bg-[#3da598]">
                    Заказать авиаперевозку
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Блок Морские перевозки */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="overflow-hidden shadow-xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Icon name="Ship" className="text-primary" size={32} />
                      <h2 className="text-3xl font-bold">{pageData.transport.sea.title}</h2>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {pageData.transport.sea.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <Icon name="Clock" className="text-primary mb-2" size={24} />
                        <div className="font-semibold">Сроки</div>
                        <div className="text-sm text-muted-foreground">{pageData.transport.sea.timing}</div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <Icon name="DollarSign" className="text-primary mb-2" size={24} />
                        <div className="font-semibold">Стоимость</div>
                        <div className="text-sm text-muted-foreground">{pageData.transport.sea.price}</div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="font-semibold mb-2 flex items-center gap-2">
                        <Icon name="Route" className="text-primary" size={20} />
                        Маршрут
                      </div>
                      <p className="text-sm text-muted-foreground">{pageData.transport.sea.route}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-semibold">Особенности:</div>
                      <ul className="space-y-2">
                        {pageData.transport.sea.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6 bg-[#4DB8AC] hover:bg-[#3da598]">
                    Заказать морскую перевозку
                  </Button>
                </div>
                
                <div className="relative h-64 lg:h-auto min-h-[400px]">
                  <img 
                    src={pageData.transport.sea.image} 
                    alt={pageData.transport.sea.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* О маршруте */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-3xl">{pageData.aboutRoute.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {pageData.aboutRoute.description}
                </p>
                
                <ul className="space-y-3">
                  {pageData.aboutRoute.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icon name="Info" className="text-primary flex-shrink-0 mt-1" size={20} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Частые вопросы</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {pageData.faq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-background border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePage;