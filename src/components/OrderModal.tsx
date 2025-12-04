import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: "calculator" | "documents";
}

const OrderModal = ({ open, onOpenChange, type = "calculator" }: OrderModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    cargoType: "",
    weight: "",
    route: "",
    comment: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error("Заполните обязательные поля");
      return;
    }

    toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время");
    onOpenChange(false);
    
    setFormData({
      name: "",
      phone: "",
      email: "",
      cargoType: "",
      weight: "",
      route: "",
      comment: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Icon name={type === "calculator" ? "Calculator" : "FileText"} size={24} className="text-primary" />
            {type === "calculator" ? "Заявка на расчет стоимости" : "Запрос документов"}
          </DialogTitle>
          <DialogDescription>
            {type === "calculator" 
              ? "Заполните форму и мы рассчитаем точную стоимость доставки вашего груза"
              : "Укажите ваши данные и мы подготовим необходимые документы"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-1">
              Ваше имя <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Введите ваше имя"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-1">
              Телефон <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {type === "calculator" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="cargo-type-modal">Тип перевозки</Label>
                <Select value={formData.cargoType} onValueChange={(value) => setFormData({ ...formData, cargoType: value })}>
                  <SelectTrigger id="cargo-type-modal">
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

              <div className="space-y-2">
                <Label htmlFor="weight">Вес груза (кг)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Введите вес"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="route">Маршрут</Label>
                <Select value={formData.route} onValueChange={(value) => setFormData({ ...formData, route: value })}>
                  <SelectTrigger id="route">
                    <SelectValue placeholder="Выберите маршрут" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urumqi-almaty">Урумчи → Алматы</SelectItem>
                    <SelectItem value="guangzhou-astana">Гуанчжоу → Астана</SelectItem>
                    <SelectItem value="yiwu-almaty">Иу → Алматы</SelectItem>
                    <SelectItem value="beijing-karaganda">Пекин → Караганда</SelectItem>
                    <SelectItem value="other">Другой маршрут</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="comment">Комментарий</Label>
            <Textarea
              id="comment"
              placeholder="Укажите дополнительную информацию о грузе или особые пожелания"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1" size="lg">
              <Icon name="Send" size={18} className="mr-2" />
              Отправить заявку
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} size="lg">
              Отмена
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center pt-2">
            Нажимая кнопку "Отправить заявку", вы соглашаетесь с обработкой персональных данных
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
