import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AgeVerification } from "@/components/AgeVerification";
import { HeroBanner } from "@/components/HeroBanner";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { categories, popularProducts } from "@/data/mockData";
import { MapPin, Clock, Phone, Truck, ShieldCheck, Gift } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AgeVerification />
      <Header />
      
      <main>
        {/* Hero Banner */}
        <section className="container py-6">
          <HeroBanner
            title="Премиум кальяны и табак"
            subtitle="Широкий ассортимент кальянов, табака, вейпов и аксессуаров от ведущих брендов"
            ctaText="Смотреть каталог"
            ctaLink="/catalog/hookahs"
            image="https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=1200&q=80"
          />
        </section>

        {/* Features */}
        <section className="container py-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Truck, title: "Доставка", desc: "По всей России" },
              { icon: ShieldCheck, title: "Гарантия", desc: "Качества товаров" },
              { icon: Gift, title: "Бонусы", desc: "За каждый заказ" },
              { icon: Clock, title: "Работаем", desc: "10:00 — 22:00" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl bg-card p-4 transition-colors hover:bg-secondary"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="container py-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Каталог
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                href={`/catalog/${category.slug}`}
                image={category.image}
                itemCount={category.itemCount}
                className={index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}
              />
            ))}
          </div>
        </section>

        {/* Popular Products */}
        <section className="container py-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Популярные товары
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.brand.name}
                price={product.price}
                oldPrice={product.oldPrice}
                image={product.images[0]}
                inStock={product.inStock}
                isNew={product.isNew}
              />
            ))}
          </div>
        </section>

        {/* Store Info */}
        <section className="container py-8">
          <div className="overflow-hidden rounded-2xl bg-card">
            <div className="grid lg:grid-cols-2">
              {/* Map placeholder */}
              <div className="relative min-h-[300px] bg-secondary lg:min-h-[400px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto h-12 w-12 text-primary" />
                    <p className="mt-2 text-muted-foreground">Карта магазина</p>
                  </div>
                </div>
              </div>
              
              {/* Store details */}
              <div className="p-8 lg:p-12">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Наш магазин
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Адрес</p>
                      <p className="text-muted-foreground">
                        г. Москва, ул. Примерная, д. 1
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Время работы</p>
                      <p className="text-muted-foreground">
                        Ежедневно: 10:00 — 22:00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Телефон</p>
                      <a
                        href="tel:+79001234567"
                        className="text-primary hover:underline"
                      >
                        +7 (900) 123-45-67
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
