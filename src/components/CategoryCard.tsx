import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  name: string;
  href: string;
  image: string;
  itemCount?: number;
  className?: string;
}

export function CategoryCard({
  name,
  href,
  image,
  itemCount,
  className,
}: CategoryCardProps) {
  return (
    <Link
      to={href}
      className={cn(
        "group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl bg-card p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow sm:p-6",
        className
      )}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary sm:text-xl">
          {name}
        </h3>
        {itemCount !== undefined && (
          <p className="mt-1 text-sm text-muted-foreground">
            {itemCount} товаров
          </p>
        )}
      </div>

      {/* Hover Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-primary/50" />
    </Link>
  );
}
