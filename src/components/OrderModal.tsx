import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: "calculator" | "documents";
}

const OrderModal = ({ open, onOpenChange, type = "calculator" }: OrderModalProps) => {
  const [formData, setFormData] = useState({
    cityFrom: "",
    cityTo: "",
    weight: "",
    phone: "",
    name: "",
    comment: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cityFrom || !formData.cityTo || !formData.weight || !formData.phone) {
      toast.error("Заполните все обязательные поля");
      return;
    }

    toast.success("Заявка отправлена! Мы перезвоним вам в течение 15 минут");
    onOpenChange(false);
    
    setFormData({
      cityFrom: "",
      cityTo: "",
      weight: "",
      phone: "",
      name: "",
      comment: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0">
        <div className="bg-white rounded-lg">
          <DialogHeader className="p-6 pb-4 text-center">
            <DialogTitle className="text-2xl font-bold text-center">
              Рассчитать стоимость доставки
            </DialogTitle>
            <DialogDescription className="text-center text-base mt-2">
              Опишите вашу задачу и мы перезвоним вам в течение <strong>15 минут</strong>
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
            <Input
              placeholder="Страна и Город погрузки"
              value={formData.cityFrom}
              onChange={(e) => setFormData({ ...formData, cityFrom: e.target.value })}
              required
              className="h-12 bg-muted/50 border-0"
            />

            <Input
              placeholder="Страна и Город доставки"
              value={formData.cityTo}
              onChange={(e) => setFormData({ ...formData, cityTo: e.target.value })}
              required
              className="h-12 bg-muted/50 border-0"
            />

            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Объем, м³"
                className="h-12 bg-muted/50 border-0 flex-1"
              />
              <Input
                type="number"
                placeholder="кг"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                required
                className="h-12 bg-muted/50 border-0 w-20"
              />
            </div>

            <Input
              type="tel"
              placeholder="Номер телефона *"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="h-12 bg-muted/50 border-0"
            />

            <Input
              placeholder="Имя"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12 bg-muted/50 border-0"
            />

            <div className="text-xs text-muted-foreground">
              Наименование или ИНН вашей компании или ИП (Работаем с юр.лицами)
            </div>

            <Textarea
              placeholder="Можете записать ваш запрос подробнее"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={4}
              className="bg-muted/50 border-0 resize-none"
            />

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
              size="lg"
            >
              Обсудить задачу
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
