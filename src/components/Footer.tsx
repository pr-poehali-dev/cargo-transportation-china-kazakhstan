import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
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
  );
};

export default Footer;
