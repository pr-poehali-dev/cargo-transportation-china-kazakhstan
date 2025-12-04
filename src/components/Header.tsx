import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Header = () => {
  return (
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
  );
};

export default Header;
