import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const CalculatorTabs = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [weight, setWeight] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

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
  );
};

export default CalculatorTabs;
