import { Link } from "react-router-dom";
import { Search, Heart, MapPin, Phone, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Кальяны", href: "/catalog/hookahs" },
  { name: "Табак", href: "/catalog/tobacco" },
  { name: "Вейпы", href: "/catalog/vapes" },
  { name: "Снюс", href: "/catalog/snus" },
  { name: "Аксессуары", href: "/catalog/accessories" },
  { name: "Уголь", href: "/catalog/coal" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* Top bar */}
      <div className="border-b border-border bg-background">
        <div className="container flex h-10 items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <a
              href="tel:+79001234567"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">+7 (900) 123-45-67</span>
            </a>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="hidden sm:inline">г. Москва, ул. Примерная, 1</span>
            <span className="sm:hidden">Москва</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
              <span className="text-xl font-bold text-primary-foreground">A</span>
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-lg font-bold text-foreground">AROMA</span>
              <span className="text-xs font-medium text-primary">HAVEN</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="flex flex-1 items-center justify-end gap-2 lg:flex-none">
            <div
              className={cn(
                "absolute left-0 right-0 top-full border-b border-border bg-card p-4 lg:relative lg:border-0 lg:p-0",
                isSearchOpen ? "block" : "hidden lg:block"
              )}
            >
              <div className="relative lg:w-64 xl:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Поиск товаров..."
                  className="h-10 bg-secondary pl-10 pr-4"
                />
              </div>
            </div>

            {/* Actions */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Link to="/favorites">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  0
                </span>
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="border-t border-border py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
