import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { categories, brands, getProductsByCategory, getCategoryBySlug } from "@/data/mockData";

type SortOption = "popular" | "price-asc" | "price-desc" | "new";

export default function CatalogPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;
  const allProducts = categorySlug ? getProductsByCategory(categorySlug) : [];

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand.id));
    }

    // Filter by price
    if (priceFrom) {
      result = result.filter((p) => p.price >= parseInt(priceFrom));
    }
    if (priceTo) {
      result = result.filter((p) => p.price <= parseInt(priceTo));
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "new":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // popular - keep original order
        break;
    }

    return result;
  }, [allProducts, selectedBrands, priceFrom, priceTo, sortBy]);

  const toggleBrand = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceFrom("");
    setPriceTo("");
  };

  const hasActiveFilters = selectedBrands.length > 0 || priceFrom || priceTo;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Brands */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
          Бренд
        </h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label
              key={brand.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary"
            >
              <Checkbox
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={() => toggleBrand(brand.id)}
              />
              <span className="text-sm text-foreground">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
          Цена, ₽
        </h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="От"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
            className="h-10"
          />
          <span className="text-muted-foreground">—</span>
          <Input
            type="number"
            placeholder="До"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
            className="h-10"
          />
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          <X className="mr-2 h-4 w-4" />
          Сбросить фильтры
        </Button>
      )}
    </div>
  );

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
          {category ? (
            <span className="text-foreground">{category.name}</span>
          ) : (
            <span className="text-foreground">Каталог</span>
          )}
        </nav>

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              {category?.name || "Все товары"}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {filteredProducts.length} товаров
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Фильтры
                  {hasActiveFilters && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      !
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-card">
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">По популярности</SelectItem>
                <SelectItem value="price-asc">Сначала дешевле</SelectItem>
                <SelectItem value="price-desc">Сначала дороже</SelectItem>
                <SelectItem value="new">Сначала новинки</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-24 rounded-xl bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Фильтры
              </h2>
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
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
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl bg-card py-16">
                <p className="text-lg font-medium text-foreground">
                  Товары не найдены
                </p>
                <p className="mt-2 text-muted-foreground">
                  Попробуйте изменить параметры фильтра
                </p>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={clearFilters}
                  >
                    Сбросить фильтры
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
