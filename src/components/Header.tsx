import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface ServiceItem {
  icon: string;
  label: string;
  href: string;
}

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const services: ServiceItem[] = [
    { icon: "Briefcase", label: "Юридическое сопровождение бизнеса", href: "/services/business-law" },
    { icon: "FileText", label: "Сопровождение закупок по 44-ФЗ и 223-ФЗ", href: "/services/procurement" },
    { icon: "Home", label: "Сопровождение сделок с недвижимостью", href: "/services/real-estate" },
    { icon: "Scale", label: "Разрешение споров", href: "/services/disputes" },
    { icon: "Scale", label: "Юрист по антимонопольному праву", href: "/services/antitrust" },
    { icon: "Building", label: "Юрист по земельному праву", href: "/services/land-law" },
    { icon: "Users", label: "Медиация", href: "/services/mediation" },
    { icon: "Receipt", label: "Налоговое сопровождение", href: "/services/tax" },
    { icon: "Shield", label: "Защита интеллектуальной собственности", href: "/services/ip" },
    { icon: "FileCheck", label: "Оформление и регистрация прав на недвижимость", href: "/services/property-registration" },
    { icon: "FileSignature", label: "Договорное право", href: "/services/contract-law" },
    { icon: "Building2", label: "Корпоративное право и корпоративные споры", href: "/services/corporate" },
    { icon: "ClipboardCheck", label: "Административная практика", href: "/services/administrative" },
    { icon: "HardHat", label: "Сопровождение ВЭД", href: "/services/foreign-trade" },
    { icon: "Briefcase", label: "Юрист по трудовому праву", href: "/services/labor-law" },
    { icon: "UserCheck", label: "Юридические услуги для физических лиц", href: "/services/individual" },
    { icon: "Calculator", label: "Банкротные споры", href: "/services/bankruptcy" },
    { icon: "Building", label: "Юрист по аренде", href: "/services/rental" },
  ];

  const countries = [
    { icon: "MapPin", label: "Россия", cities: ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань", "Красноярск"] },
    { icon: "Map", label: "Казахстан", cities: ["Алматы", "Астана", "Шымкент", "Караганда"] },
    { icon: "Globe", label: "Азия", cities: ["Пекин", "Гуанчжоу", "Иу", "Урумчи"] },
    { icon: "Plane", label: "Европа", cities: ["Варшава", "Берлин", "Прага"] },
  ];

  const transportTypes = [
    { icon: "Truck", label: "Автомобильные", href: "/transport/auto" },
    { icon: "Train", label: "Железнодорожные", href: "/transport/railway" },
    { icon: "Plane", label: "Авиаперевозки", href: "/transport/air" },
    { icon: "Ship", label: "Морские", href: "/transport/sea" },
  ];

  const renderMegaMenu = (type: string) => {
    if (type === "services") {
      const columns = 3;
      const itemsPerColumn = Math.ceil(services.length / columns);
      
      return (
        <div className="absolute left-0 right-0 mt-2 bg-white text-foreground rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-3 gap-6">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div key={colIndex} className="space-y-2">
                  {services
                    .slice(colIndex * itemsPerColumn, (colIndex + 1) * itemsPerColumn)
                    .map((service) => (
                      <a
                        key={service.label}
                        href={service.href}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors group/item"
                      >
                        <div className="w-10 h-10 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                          <Icon name={service.icon} size={20} />
                        </div>
                        <span className="text-sm leading-tight group-hover/item:text-primary font-medium">{service.label}</span>
                      </a>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (type === "countries") {
      return (
        <div className="absolute left-0 right-0 mt-2 bg-white text-foreground rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-4 gap-6">
              {countries.map((country) => (
                <div key={country.label}>
                  <div className="flex items-center gap-2 mb-4 font-semibold text-primary">
                    <Icon name={country.icon} size={20} />
                    <span>{country.label}</span>
                  </div>
                  <div className="space-y-2">
                    {country.cities.map((city) => (
                      <a
                        key={city}
                        href={`/${country.label.toLowerCase()}/${city.toLowerCase()}`}
                        className="block px-3 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors text-sm"
                      >
                        {city}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (type === "transport") {
      return (
        <div className="absolute left-0 mt-2 w-64 bg-white text-foreground rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          {transportTypes.map((transport) => (
            <a
              key={transport.label}
              href={transport.href}
              className="flex items-center gap-3 px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors border-b border-border/50 last:border-b-0"
            >
              <Icon name={transport.icon} size={20} />
              <span>{transport.label}</span>
            </a>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <header className="bg-gradient-to-r from-primary to-primary/80 text-white py-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Package" size={32} />
            <span className="text-2xl font-bold">ChinaKaz Logistics</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-1">
            <a href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-white/10">
              <Icon name="Home" size={18} />
              <span>Главная</span>
            </a>

            <div className="relative group">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-white/10 cursor-pointer">
                <Icon name="Package" size={18} />
                <span>Услуги</span>
                <Icon name="ChevronDown" size={16} className="transition-transform group-hover:rotate-180" />
              </div>
              {renderMegaMenu("services")}
            </div>

            <div className="relative group">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-white/10 cursor-pointer">
                <Icon name="Truck" size={18} />
                <span>Виды перевозок</span>
                <Icon name="ChevronDown" size={16} className="transition-transform group-hover:rotate-180" />
              </div>
              {renderMegaMenu("transport")}
            </div>

            <div className="relative group">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-white/10 cursor-pointer">
                <Icon name="MapPin" size={18} />
                <span>Направления</span>
                <Icon name="ChevronDown" size={16} className="transition-transform group-hover:rotate-180" />
              </div>
              {renderMegaMenu("countries")}
            </div>

            <a href="#contact" className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-white/10">
              <Icon name="Building" size={18} />
              <span>О компании</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" className="hidden sm:flex">
              <Icon name="Phone" size={16} className="mr-2" />
              +7 (777) 123-45-67
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden text-white hover:bg-white/20">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-gradient-to-b from-primary to-primary/90 text-white border-r-0 overflow-y-auto">
                <div className="flex flex-col gap-4 mt-8">
                  <a href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10">
                    <Icon name="Home" size={18} />
                    <span>Главная</span>
                  </a>

                  <div>
                    <button
                      onClick={() => setActiveMegaMenu(activeMegaMenu === "services" ? null : "services")}
                      className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-white/10"
                    >
                      <div className="flex items-center gap-2">
                        <Icon name="Package" size={18} />
                        <span>Услуги</span>
                      </div>
                      <Icon name="ChevronDown" size={16} className={`transition-transform ${activeMegaMenu === "services" ? "rotate-180" : ""}`} />
                    </button>
                    {activeMegaMenu === "services" && (
                      <div className="ml-6 mt-2 space-y-1">
                        {services.slice(0, 8).map((service) => (
                          <a
                            key={service.label}
                            href={service.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-white/10"
                          >
                            <Icon name={service.icon} size={16} />
                            <span className="text-xs">{service.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <a href="#contact" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10">
                    <Icon name="Building" size={18} />
                    <span>О компании</span>
                  </a>

                  <div className="mt-6 pt-6 border-t border-white/20">
                    <Button variant="secondary" size="sm" className="w-full">
                      <Icon name="Calculator" size={16} className="mr-2" />
                      Калькулятор
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
