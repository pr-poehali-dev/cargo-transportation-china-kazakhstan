import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Index = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [weight, setWeight] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const services = [
    {
      icon: "Truck",
      title: "Автомобильные перевозки",
      description: "Быстрая доставка грузов любого объема из Китая в Казахстан",
      time: "5-7 дней",
      price: "от $2/кг"
    },
    {
      icon: "Train",
      title: "Железнодорожные перевозки",
      description: "Экономичная доставка крупных партий товара",
      time: "12-15 дней",
      price: "от $1.2/кг"
    },
    {
      icon: "Plane",
      title: "Авиаперевозки",
      description: "Срочная доставка товаров за минимальное время",
      time: "2-3 дня",
      price: "от $5/кг"
    },
    {
      icon: "Container",
      title: "Контейнерные перевозки",
      description: "Оптимальное решение для крупногабаритных грузов",
      time: "20-25 дней",
      price: "от $800/контейнер"
    }
  ];

  const routes = [
    {
      from: "Урумчи",
      to: "Алматы",
      distance: "450 км",
      time: "1-2 дня",
      popular: true
    },
    {
      from: "Гуанчжоу",
      to: "Астана",
      distance: "5200 км",
      time: "10-12 дней",
      popular: true
    },
    {
      from: "Иу",
      to: "Алматы",
      distance: "4800 км",
      time: "8-10 дней",
      popular: false
    },
    {
      from: "Пекин",
      to: "Караганда",
      distance: "3500 км",
      time: "7-9 дней",
      popular: false
    }
  ];

  const reviews = [
    {
      name: "Айдар Нурбеков",
      company: "ТОО \"Восток Трейд\"",
      rating: 5,
      text: "Работаем с компанией уже 3 года. Всегда четкие сроки, груз в целости. Рекомендую!",
      date: "15.11.2024"
    },
    {
      name: "Мария Петрова",
      company: "ИП Петрова М.С.",
      rating: 5,
      text: "Отличный сервис! Помогли с оформлением всех документов, груз пришел вовремя.",
      date: "03.11.2024"
    },
    {
      name: "Ержан Касымов",
      company: "ТОО \"Азия Логистик\"",
      rating: 4,
      text: "Хорошее соотношение цены и качества. Один раз была небольшая задержка, но менеджер сразу предупредил.",
      date: "28.10.2024"
    }
  ];

  const calculateShipping = () => {
    if (!weight || !cargoType) {
      toast.error("Заполните все поля");
      return;
    }

    const prices: { [key: string]: number } = {
      auto: 2,
      train: 1.2,
      air: 5,
      container: 800
    };

    const basePrice = prices[cargoType] || 2;
    const total = cargoType === "container" ? basePrice : parseFloat(weight) * basePrice;
    
    setCalculatedPrice(total);
    toast.success("Стоимость рассчитана!");
  };

  const trackCargo = () => {
    if (!trackingNumber) {
      toast.error("Введите номер отслеживания");
      return;
    }
    toast.success("Груз найден! Статус: В пути");
  };

  const generateDocument = (type: string) => {
    toast.success(`${type} успешно сгенерирован и готов к скачиванию`);
  };

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-primary to-primary/80 text-white py-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Package" size={32} />
              <span className="text-2xl font-bold">ChinaKaz Logistics</span>
            </div>
            <div className="hidden md:flex gap-6">
              <a href="#services" className="hover:text-secondary transition-colors">Услуги</a>
              <a href="#routes" className="hover:text-secondary transition-colors">Маршруты</a>
              <a href="#tracking" className="hover:text-secondary transition-colors">Отслеживание</a>
              <a href="#calculator" className="hover:text-secondary transition-colors">Калькулятор</a>
              <a href="#reviews" className="hover:text-secondary transition-colors">Отзывы</a>
              <a href="#contact" className="hover:text-secondary transition-colors">Контакты</a>
            </div>
            <Button variant="secondary" size="sm">
              <Icon name="Phone" size={16} className="mr-2" />
              +7 (777) 123-45-67
            </Button>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Грузоперевозки Китай — Казахстан
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in-up">
              Надежная доставка грузов с полным сопровождением и контролем на каждом этапе
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up">
              <Button size="lg" variant="secondary" className="text-lg">
                <Icon name="Calculator" size={20} className="mr-2" />
                Рассчитать стоимость
              </Button>
              <Button size="lg" variant="outline" className="text-lg bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary">
                <Icon name="FileText" size={20} className="mr-2" />
                Запросить документы
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { icon: "Clock", label: "От 2 дней", desc: "доставка" },
                { icon: "Shield", label: "100%", desc: "гарантия" },
                { icon: "TrendingDown", label: "Низкие", desc: "цены" },
                { icon: "Headphones", label: "24/7", desc: "поддержка" }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <Icon name={item.icon} size={32} className="mx-auto mb-2" />
                  <div className="text-2xl font-bold">{item.label}</div>
                  <div className="text-sm text-white/80">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Наши услуги</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Выберите оптимальный способ доставки для вашего груза
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <Card key={i} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={28} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                      <span>{service.time}</span>
                    </div>
                    <div className="font-semibold text-primary">{service.price}</div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Заказать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="routes" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Популярные маршруты</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Основные направления доставки Китай — Казахстан
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {routes.map((route, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="MapPin" className="text-primary" size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{route.from}</div>
                        <div className="text-sm text-muted-foreground">Отправление</div>
                      </div>
                    </div>
                    {route.popular && (
                      <Badge variant="secondary">Популярный</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 my-4">
                    <Separator className="flex-1" />
                    <Icon name="ArrowRight" className="text-primary" size={24} />
                    <Separator className="flex-1" />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Icon name="Flag" className="text-secondary" size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-lg">{route.to}</div>
                      <div className="text-sm text-muted-foreground">Назначение</div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Icon name="Route" size={16} className="text-muted-foreground" />
                      <span>{route.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                      <span>{route.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Калькулятор и отслеживание</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Рассчитайте стоимость доставки и отследите ваш груз
            </p>
            <Tabs defaultValue="calculator" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="calculator">
                  <Icon name="Calculator" size={18} className="mr-2" />
                  Калькулятор
                </TabsTrigger>
                <TabsTrigger value="tracking">
                  <Icon name="MapPin" size={18} className="mr-2" />
                  Отслеживание
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <Icon name="FileText" size={18} className="mr-2" />
                  Документы
                </TabsTrigger>
              </TabsList>

              <TabsContent value="calculator">
                <Card>
                  <CardHeader>
                    <CardTitle>Расчет стоимости доставки</CardTitle>
                    <CardDescription>
                      Укажите параметры груза для расчета стоимости
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight">Вес груза (кг)</Label>
                        <Input
                          id="weight"
                          type="number"
                          placeholder="Введите вес"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cargo-type">Тип перевозки</Label>
                        <Select value={cargoType} onValueChange={setCargoType}>
                          <SelectTrigger id="cargo-type">
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">Автомобильная</SelectItem>
                            <SelectItem value="train">Железнодорожная</SelectItem>
                            <SelectItem value="air">Авиа</SelectItem>
                            <SelectItem value="container">Контейнер</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={calculateShipping} className="w-full" size="lg">
                      <Icon name="Calculator" size={18} className="mr-2" />
                      Рассчитать стоимость
                    </Button>
                    {calculatedPrice !== null && (
                      <div className="p-6 bg-primary/5 rounded-lg border-2 border-primary animate-scale-in">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground mb-2">Ориентировочная стоимость</div>
                          <div className="text-4xl font-bold text-primary">${calculatedPrice.toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground mt-2">
                            Точная стоимость будет рассчитана после уточнения всех параметров
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tracking" id="tracking">
                <Card>
                  <CardHeader>
                    <CardTitle>Отслеживание груза</CardTitle>
                    <CardDescription>
                      Введите номер накладной для отслеживания груза
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tracking">Номер отслеживания</Label>
                      <Input
                        id="tracking"
                        placeholder="Например: CK123456789"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                      />
                    </div>
                    <Button onClick={trackCargo} className="w-full" size="lg">
                      <Icon name="Search" size={18} className="mr-2" />
                      Отследить груз
                    </Button>
                    
                    <div className="mt-8 p-6 bg-muted/50 rounded-lg">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <Icon name="Check" size={16} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">Груз принят</div>
                            <div className="text-sm text-muted-foreground">Гуанчжоу, Китай</div>
                            <div className="text-xs text-muted-foreground">01.12.2024 10:30</div>
                          </div>
                        </div>
                        <Progress value={66} className="h-2" />
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                            <Icon name="Truck" size={16} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">В пути</div>
                            <div className="text-sm text-muted-foreground">Урумчи, Китай</div>
                            <div className="text-xs text-muted-foreground">03.12.2024 14:20</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 opacity-40">
                          <div className="w-8 h-8 bg-muted-foreground/30 rounded-full flex items-center justify-center flex-shrink-0">
                            <Icon name="Package" size={16} className="text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">Ожидает получения</div>
                            <div className="text-sm text-muted-foreground">Алматы, Казахстан</div>
                            <div className="text-xs text-muted-foreground">Ожидается: 05.12.2024</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle>Генерация документов</CardTitle>
                    <CardDescription>
                      Создайте необходимые логистические документы
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <Button
                        variant="outline"
                        size="lg"
                        className="justify-start h-auto py-4"
                        onClick={() => generateDocument("Транспортная накладная")}
                      >
                        <div className="flex items-start gap-4 text-left w-full">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name="FileText" size={24} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-base">Транспортная накладная (CMR)</div>
                            <div className="text-sm text-muted-foreground">Международная накладная для автоперевозок</div>
                          </div>
                          <Icon name="Download" size={20} className="text-muted-foreground" />
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className="justify-start h-auto py-4"
                        onClick={() => generateDocument("Счет на оплату")}
                      >
                        <div className="flex items-start gap-4 text-left w-full">
                          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name="Receipt" size={24} className="text-secondary" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-base">Счет на оплату</div>
                            <div className="text-sm text-muted-foreground">Официальный счет для оплаты услуг</div>
                          </div>
                          <Icon name="Download" size={20} className="text-muted-foreground" />
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className="justify-start h-auto py-4"
                        onClick={() => generateDocument("Акт выполненных работ")}
                      >
                        <div className="flex items-start gap-4 text-left w-full">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name="ClipboardCheck" size={24} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-base">Акт выполненных работ</div>
                            <div className="text-sm text-muted-foreground">Документ о выполнении услуг доставки</div>
                          </div>
                          <Icon name="Download" size={20} className="text-muted-foreground" />
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className="justify-start h-auto py-4"
                        onClick={() => generateDocument("Таможенная декларация")}
                      >
                        <div className="flex items-start gap-4 text-left w-full">
                          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name="FileCheck" size={24} className="text-secondary" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-base">Таможенная декларация</div>
                            <div className="text-sm text-muted-foreground">Документы для таможенного оформления</div>
                          </div>
                          <Icon name="Download" size={20} className="text-muted-foreground" />
                        </div>
                      </Button>
                    </div>

                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <div className="flex gap-3">
                        <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Примечание:</strong> Для генерации документов потребуются данные о грузе и реквизиты компании. После нажатия на кнопку откроется форма для заполнения необходимой информации.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Отзывы клиентов</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Что говорят о нас наши партнеры
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Icon
                        key={idx}
                        name="Star"
                        size={18}
                        className={idx < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <p className="text-sm mb-4 text-foreground/90 leading-relaxed">{review.text}</p>
                  <Separator className="my-4" />
                  <div>
                    <div className="font-semibold">{review.name}</div>
                    <div className="text-sm text-muted-foreground">{review.company}</div>
                    <div className="text-xs text-muted-foreground mt-1">{review.date}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">О компании и контакты</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              ChinaKaz Logistics — ваш надежный партнер в международных перевозках
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>О компании</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Мы специализируемся на грузоперевозках между Китаем и Казахстаном с 2015 года. 
                    За это время мы доставили более 50 000 грузов и заслужили доверие сотен компаний.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Icon name="CheckCircle2" className="text-primary" size={20} />
                      <span>Опыт работы более 9 лет</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="CheckCircle2" className="text-primary" size={20} />
                      <span>Собственный автопарк</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="CheckCircle2" className="text-primary" size={20} />
                      <span>Таможенное оформление</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="CheckCircle2" className="text-primary" size={20} />
                      <span>Страхование грузов</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Phone" className="text-primary" size={20} />
                      </div>
                      <div>
                        <div className="font-semibold">Телефон</div>
                        <div className="text-muted-foreground">+7 (777) 123-45-67</div>
                        <div className="text-muted-foreground">+7 (708) 987-65-43</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Mail" className="text-primary" size={20} />
                      </div>
                      <div>
                        <div className="font-semibold">Email</div>
                        <div className="text-muted-foreground">info@chinakaz.kz</div>
                        <div className="text-muted-foreground">support@chinakaz.kz</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="MapPin" className="text-primary" size={20} />
                      </div>
                      <div>
                        <div className="font-semibold">Адрес офиса</div>
                        <div className="text-muted-foreground">г. Алматы, пр. Абая 150/230</div>
                        <div className="text-muted-foreground">БЦ "Нурлы Тау", офис 405</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Clock" className="text-primary" size={20} />
                      </div>
                      <div>
                        <div className="font-semibold">Режим работы</div>
                        <div className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</div>
                        <div className="text-muted-foreground">Сб: 10:00 - 15:00</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Package" size={28} />
                <span className="text-xl font-bold">ChinaKaz</span>
              </div>
              <p className="text-white/80 text-sm">
                Надежная доставка грузов из Китая в Казахстан с 2015 года
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Автоперевозки</li>
                <li>Ж/Д перевозки</li>
                <li>Авиадоставка</li>
                <li>Контейнеры</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>О нас</li>
                <li>Отзывы</li>
                <li>Партнерам</li>
                <li>Вакансии</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>+7 (777) 123-45-67</li>
                <li>info@chinakaz.kz</li>
                <li>г. Алматы, пр. Абая 150/230</li>
              </ul>
            </div>
          </div>
          <Separator className="bg-white/20 mb-8" />
          <div className="text-center text-sm text-white/60">
            © 2024 ChinaKaz Logistics. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
