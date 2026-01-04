import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Mail, MessageCircle } from "lucide-react";

const categories = [
  { name: "Кальяны", href: "/catalog/hookahs" },
  { name: "Табак для кальяна", href: "/catalog/tobacco" },
  { name: "Вейпы и POD-системы", href: "/catalog/vapes" },
  { name: "Жевательный табак", href: "/catalog/snus" },
  { name: "Аксессуары", href: "/catalog/accessories" },
  { name: "Уголь", href: "/catalog/coal" },
];

const info = [
  { name: "О нас", href: "/about" },
  { name: "Контакты", href: "/contacts" },
  { name: "Доставка", href: "/delivery" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                <span className="text-xl font-bold text-primary-foreground">A</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">AROMA</span>
                <span className="text-xs font-medium text-primary">HAVEN</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Ваш магазин качественных кальянов, табака и аксессуаров. Работаем для вас с 2020 года.
            </p>
            <div className="flex gap-3">
              <a
                href="https://t.me/aromahaven"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Каталог
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Информация
            </h3>
            <ul className="space-y-2">
              {info.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Контакты
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  г. Москва, ул. Примерная, д. 1
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <a
                  href="tel:+79001234567"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  +7 (900) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <a
                  href="mailto:info@aromahaven.ru"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  info@aromahaven.ru
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Ежедневно: 10:00 — 22:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Aroma Haven. Все права защищены.
            </p>
            <p className="text-xs text-muted-foreground">
              Продажа лицам старше 18 лет
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
