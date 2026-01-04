import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Heart,
  Phone,
  MessageCircle,
  Check,
  Package,
} from "lucide-react";
import { products, getProductBySlug } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Find product by id (mock uses id as slug for simplicity)
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Товар не найден
          </h1>
          <Link to="/" className="mt-4 text-primary hover:underline">
            Вернуться на главную
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const relatedProducts = products
    .filter(
      (p) => p.category.id === product.category.id && p.id !== product.id
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-6">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary">
            Главная
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Link
            to={`/catalog/${product.category.slug}`}
            className="text-muted-foreground hover:text-primary"
          >
            {product.category.name}
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="line-clamp-1 text-foreground">{product.name}</span>
        </nav>

        {/* Product Section */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-card">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {/* Badges */}
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-primary text-primary-foreground">
                    NEW
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    -{discount}%
                  </Badge>
                )}
              </div>
              {/* Favorite */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={cn(
                    "h-6 w-6",
                    isFavorite
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  )}
                />
              </Button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent hover:border-muted"
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Name */}
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-primary">
                {product.brand.name}
              </p>
              <h1 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                {product.price.toLocaleString("ru-RU")} ₽
              </span>
              {product.oldPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {product.oldPrice.toLocaleString("ru-RU")} ₽
                </span>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <span className="font-medium text-green-500">В наличии</span>
                </>
              ) : (
                <>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/20">
                    <Package className="h-4 w-4 text-destructive" />
                  </div>
                  <span className="font-medium text-destructive">
                    Нет в наличии
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                Описание
              </h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Attributes */}
            <div>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                Характеристики
              </h2>
              <div className="space-y-2 rounded-xl bg-card p-4">
                {Object.entries(product.attributes).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between border-b border-border py-2 last:border-0"
                  >
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="gradient" size="lg" className="flex-1" asChild>
                <a href="tel:+79001234567">
                  <Phone className="mr-2 h-5 w-5" />
                  Позвонить
                </a>
              </Button>
              <Button variant="outline" size="lg" className="flex-1" asChild>
                <a
                  href="https://t.me/aromahaven"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Написать в Telegram
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Похожие товары
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product) => (
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
        )}
      </main>

      <Footer />
    </div>
  );
}
