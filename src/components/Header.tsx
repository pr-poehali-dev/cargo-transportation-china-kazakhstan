import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MenuItem {
  label: string;
  href?: string;
  icon?: string;
  submenu?: MenuItem[];
}

const Header = () => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const menuItems: MenuItem[] = [
    { label: "Главная", href: "/", icon: "Home" },
    {
      label: "Виды перевозок",
      icon: "Truck",
      submenu: [
        { label: "Автомобильные", href: "/auto" },
        { label: "Железнодорожные", href: "/railway" },
        { label: "Авиаперевозки", href: "/air" },
        { label: "Морские", href: "/sea" },
      ]
    },
    {
      label: "Россия",
      icon: "MapPin",
      submenu: [
        { label: "Москва", href: "/russia/moscow" },
        { label: "Санкт-Петербург", href: "/russia/spb" },
        { label: "Новосибирск", href: "/russia/novosibirsk" },
        { label: "Екатеринбург", href: "/russia/ekaterinburg" },
        { label: "Казань", href: "/russia/kazan" },
        { label: "Красноярск", href: "/russia/krasnoyarsk" },
        { label: "Нижний Новгород", href: "/russia/nn" },
        { label: "Челябинск", href: "/russia/chelyabinsk" },
        { label: "Самара", href: "/russia/samara" },
      ]
    },
    {
      label: "Казахстан",
      icon: "Map",
      submenu: [
        { label: "Алматы", href: "/kazakhstan/almaty" },
        { label: "Астана", href: "/kazakhstan/astana" },
        { label: "Шымкент", href: "/kazakhstan/shymkent" },
        { label: "Караганда", href: "/kazakhstan/karaganda" },
      ]
    },
    { label: "Азия", icon: "Globe", href: "/asia" },
    { label: "Европа", icon: "Plane", href: "/europe" },
    { label: "Весь мир", icon: "Earth", href: "/world" },
    { label: "Наши услуги", icon: "Package", href: "#services" },
    { label: "Наша компания", icon: "Building", href: "#contact" },
  ];

  const renderMenuItem = (item: MenuItem, isMobile = false) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;

    if (hasSubmenu) {
      return (
        <div key={item.label} className={isMobile ? "" : "relative group"}>
          <button
            onClick={() => isMobile && toggleMenu(item.label)}
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-colors ${
              isMobile
                ? "hover:bg-white/10 text-left"
                : "hover:text-secondary"
            } ${openMenus[item.label] ? "bg-white/10" : ""}`}
          >
            {item.icon && <Icon name={item.icon} size={18} />}
            <span>{item.label}</span>
            <Icon
              name="ChevronDown"
              size={16}
              className={`ml-auto transition-transform ${
                openMenus[item.label] ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Desktop submenu */}
          {!isMobile && (
            <div className="absolute left-0 mt-2 w-56 bg-white text-foreground rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
              {item.submenu!.map((subitem) => (
                <a
                  key={subitem.label}
                  href={subitem.href}
                  className="block px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors border-b border-border/50 last:border-b-0"
                >
                  {subitem.label}
                </a>
              ))}
            </div>
          )}

          {/* Mobile submenu */}
          {isMobile && openMenus[item.label] && (
            <div className="ml-6 mt-1 space-y-1 border-l-2 border-white/20 pl-3">
              {item.submenu!.map((subitem) => (
                <a
                  key={subitem.label}
                  href={subitem.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
                >
                  {subitem.label}
                </a>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <a
        key={item.label}
        href={item.href}
        onClick={() => isMobile && setMobileOpen(false)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          isMobile ? "hover:bg-white/10" : "hover:text-secondary"
        }`}
      >
        {item.icon && <Icon name={item.icon} size={18} />}
        <span>{item.label}</span>
      </a>
    );
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
          <div className="hidden lg:flex items-center gap-2">
            {menuItems.map((item) => renderMenuItem(item, false))}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" className="hidden sm:flex">
              <Icon name="Phone" size={16} className="mr-2" />
              +7 (777) 123-45-67
            </Button>

            {/* Mobile menu button */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden text-white hover:bg-white/20">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-gradient-to-b from-primary to-primary/90 text-white border-r-0">
                <div className="flex flex-col gap-2 mt-8">
                  {menuItems.map((item) => renderMenuItem(item, true))}
                  
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