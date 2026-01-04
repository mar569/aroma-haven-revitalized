import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  inStock?: boolean;
  isNew?: boolean;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  className?: string;
}

export function ProductCard({
  id,
  name,
  brand,
  price,
  oldPrice,
  image,
  inStock = true,
  isNew = false,
  isFavorite = false,
  onFavoriteToggle,
  className,
}: ProductCardProps) {
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl bg-card transition-all duration-300 hover:shadow-card",
        className
      )}
    >
      {/* Badges */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
        {isNew && (
          <span className="rounded-md bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">
            NEW
          </span>
        )}
        {discount > 0 && (
          <span className="rounded-md bg-destructive px-2 py-1 text-xs font-semibold text-destructive-foreground">
            -{discount}%
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-10 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
        onClick={(e) => {
          e.preventDefault();
          onFavoriteToggle?.();
        }}
      >
        <Heart
          className={cn(
            "h-5 w-5 transition-colors",
            isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
          )}
        />
      </Button>

      {/* Image */}
      <Link to={`/product/${id}`} className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <span className="rounded-lg bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
              Нет в наличии
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <Link to={`/product/${id}`} className="group/link">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            {brand}
          </p>
          <h3 className="mt-1 line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover/link:text-primary">
            {name}
          </h3>
        </Link>

        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="text-lg font-bold text-foreground">
            {price.toLocaleString("ru-RU")} ₽
          </span>
          {oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {oldPrice.toLocaleString("ru-RU")} ₽
            </span>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-3 w-full"
          asChild
          disabled={!inStock}
        >
          <Link to={`/product/${id}`}>Подробнее</Link>
        </Button>
      </div>
    </div>
  );
}
