import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const CalculatorTabs = () => {
  const [formData, setFormData] = useState({
    transport: "",
    cityFrom: "",
    cityTo: "",
    conditions: "",
    volume: 40,
    weight: "",
    company: "",
    name: "",
    phone: "",
    comment: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phone) {
      toast.error("Укажите номер телефона");
      return;
    }

    toast.success("Заявка отправлена! Мы рассчитаем точную стоимость и свяжемся с вами");
    
    setFormData({
      transport: "",
      cityFrom: "",
      cityTo: "",
      conditions: "",
      volume: 40,
      weight: "",
      company: "",
      name: "",
      phone: "",
      comment: ""
    });
  };

  return (
    <section id="calculator" className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center">
            Рассчитайте точную стоимость грузоперевозки в компании ChinaKaz Logistics
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card className="p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6">
                Калькулятор стоимости доставки и перевозки грузов по всему миру
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transport">Вид транспорта</Label>
                    <Select value={formData.transport} onValueChange={(value) => setFormData({ ...formData, transport: value })}>
                      <SelectTrigger id="transport">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="truck">Автомобильная</SelectItem>
                        <SelectItem value="train">Железнодорожная</SelectItem>
                        <SelectItem value="air">Авиаперевозка</SelectItem>
                        <SelectItem value="sea">Морская</SelectItem>
                        <SelectItem value="container">Контейнер</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cityFrom">Город погрузки</Label>
                    <Input
                      id="cityFrom"
                      placeholder=""
                      value={formData.cityFrom}
                      onChange={(e) => setFormData({ ...formData, cityFrom: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cityTo">Город доставки</Label>
                    <Input
                      id="cityTo"
                      placeholder=""
                      value={formData.cityTo}
                      onChange={(e) => setFormData({ ...formData, cityTo: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="conditions">Условия поставки</Label>
                    <Select value={formData.conditions} onValueChange={(value) => setFormData({ ...formData, conditions: value })}>
                      <SelectTrigger id="conditions">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exw">EXW</SelectItem>
                        <SelectItem value="fob">FOB</SelectItem>
                        <SelectItem value="cif">CIF</SelectItem>
                        <SelectItem value="ddp">DDP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Объем м3</Label>
                      <span className="text-lg font-semibold text-primary">{formData.volume}</span>
                    </div>
                    <Slider
                      value={[formData.volume]}
                      onValueChange={(value) => setFormData({ ...formData, volume: value[0] })}
                      max={100}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Вес, кг</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder=""
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Наименование или ИНН вашей компании</Label>
                    <Input
                      id="company"
                      placeholder=""
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input
                      id="name"
                      placeholder=""
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Номер телефона <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder=""
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Можете написать ваш запрос подробнее</Label>
                  <Textarea
                    id="comment"
                    placeholder=""
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="min-h-24 resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full text-lg h-14 bg-[#4DB8AC] hover:bg-[#3da598]">
                  Рассчитать точную цену доставки
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://cdn.poehali.dev/files/bf56c7a8-3d69-4e9e-8eeb-28436bdf2be3.png" 
                  alt="Контейнерное судно"
                  className="w-full h-auto"
                />
              </div>

              <Card className="p-6">
                <ul className="space-y-4">
                  {[
                    "12 филиалов в странах: Россия, Казахстан, Китай, ОАЭ, Турция, Азербайджан, Грузия, Узбекистан, Польша, Нидерланды, Чехия, Индия",
                    "Склад консолидации в Китае город Хорос",
                    "Формируем собственные контейнерные поезда 20 и 40 футов",
                    "Контракты с ЮКД, Авто, Морской линией"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorTabs;
