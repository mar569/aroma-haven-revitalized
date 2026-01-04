// Mock data for the catalog - will be replaced with Supabase data

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: Brand;
  category: Category;
  price: number;
  oldPrice?: number;
  images: string[];
  description: string;
  inStock: boolean;
  isNew: boolean;
  attributes: Record<string, string>;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  inStock: boolean;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Кальяны",
    slug: "hookahs",
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&q=80",
    itemCount: 45,
  },
  {
    id: "2",
    name: "Табак для кальяна",
    slug: "tobacco",
    image: "https://images.unsplash.com/photo-1559304822-9eb2813c9844?w=600&q=80",
    itemCount: 120,
  },
  {
    id: "3",
    name: "Вейпы и POD-системы",
    slug: "vapes",
    image: "https://images.unsplash.com/photo-1560913210-8f93dc79fa2b?w=600&q=80",
    itemCount: 85,
  },
  {
    id: "4",
    name: "Жевательный табак",
    slug: "snus",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    itemCount: 60,
  },
  {
    id: "5",
    name: "Аксессуары",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=600&q=80",
    itemCount: 150,
  },
  {
    id: "6",
    name: "Уголь",
    slug: "coal",
    image: "https://images.unsplash.com/photo-1585156792598-9875cf22e5d8?w=600&q=80",
    itemCount: 25,
  },
];

export const brands: Brand[] = [
  { id: "1", name: "Darkside", slug: "darkside" },
  { id: "2", name: "Adalya", slug: "adalya" },
  { id: "3", name: "Brusko", slug: "brusko" },
  { id: "4", name: "Fumari", slug: "fumari" },
  { id: "5", name: "Tangiers", slug: "tangiers" },
  { id: "6", name: "Must Have", slug: "must-have" },
  { id: "7", name: "HQD", slug: "hqd" },
  { id: "8", name: "Elfbar", slug: "elfbar" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Кальян Alpha Hookah Model X",
    slug: "alpha-hookah-model-x",
    brand: brands[0],
    category: categories[0],
    price: 12990,
    oldPrice: 15990,
    images: [
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&q=80",
    ],
    description: "Премиальный кальян из нержавеющей стали с уникальным дизайном.",
    inStock: true,
    isNew: true,
    attributes: {
      "Материал": "Нержавеющая сталь",
      "Высота": "65 см",
      "Производитель": "Россия",
    },
  },
  {
    id: "2",
    name: "Darkside Core - Falling Star",
    slug: "darkside-core-falling-star",
    brand: brands[0],
    category: categories[1],
    price: 890,
    images: [
      "https://images.unsplash.com/photo-1559304822-9eb2813c9844?w=600&q=80",
    ],
    description: "Яркий фруктовый микс с нотами маракуйи и цитрусов.",
    inStock: true,
    isNew: false,
    attributes: {
      "Крепость": "Средняя",
      "Вес": "100 г",
      "Вкус": "Фруктовый",
    },
  },
  {
    id: "3",
    name: "Adalya - Love 66",
    slug: "adalya-love-66",
    brand: brands[1],
    category: categories[1],
    price: 450,
    images: [
      "https://images.unsplash.com/photo-1559304822-9eb2813c9844?w=600&q=80",
    ],
    description: "Легендарный вкус арбуза с дыней и мятой.",
    inStock: true,
    isNew: false,
    attributes: {
      "Крепость": "Лёгкая",
      "Вес": "50 г",
      "Вкус": "Фруктовый, Мятный",
    },
  },
  {
    id: "4",
    name: "HQD Cuvie Plus - Mango Ice",
    slug: "hqd-cuvie-plus-mango-ice",
    brand: brands[6],
    category: categories[2],
    price: 790,
    images: [
      "https://images.unsplash.com/photo-1560913210-8f93dc79fa2b?w=600&q=80",
    ],
    description: "Одноразовая электронная сигарета со вкусом манго и холодком.",
    inStock: true,
    isNew: true,
    attributes: {
      "Затяжек": "1200",
      "Никотин": "50 мг/мл",
      "Объём": "5.5 мл",
    },
  },
  {
    id: "5",
    name: "Elfbar BC5000 - Strawberry Mango",
    slug: "elfbar-bc5000-strawberry-mango",
    brand: brands[7],
    category: categories[2],
    price: 1290,
    oldPrice: 1490,
    images: [
      "https://images.unsplash.com/photo-1560913210-8f93dc79fa2b?w=600&q=80",
    ],
    description: "Премиальный одноразовый вейп с клубнично-манговым вкусом.",
    inStock: true,
    isNew: false,
    attributes: {
      "Затяжек": "5000",
      "Никотин": "50 мг/мл",
      "Аккумулятор": "650 mAh",
    },
  },
  {
    id: "6",
    name: "Brusko Minican 3 Pro Kit",
    slug: "brusko-minican-3-pro",
    brand: brands[2],
    category: categories[2],
    price: 2490,
    images: [
      "https://images.unsplash.com/photo-1560913210-8f93dc79fa2b?w=600&q=80",
    ],
    description: "Компактная POD-система с регулировкой мощности.",
    inStock: true,
    isNew: true,
    attributes: {
      "Мощность": "5-25 Вт",
      "Аккумулятор": "900 mAh",
      "Объём картриджа": "3 мл",
    },
  },
  {
    id: "7",
    name: "Siberia -80 Red",
    slug: "siberia-80-red",
    brand: { id: "9", name: "Siberia", slug: "siberia" },
    category: categories[3],
    price: 390,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ],
    description: "Экстремально крепкий никотиновый снюс.",
    inStock: true,
    isNew: false,
    attributes: {
      "Крепость": "43 мг/г",
      "Вес": "20 г",
      "Порций": "20 шт",
    },
  },
  {
    id: "8",
    name: "Уголь Cocobrico",
    slug: "coal-cocobrico",
    brand: { id: "10", name: "Cocobrico", slug: "cocobrico" },
    category: categories[5],
    price: 590,
    images: [
      "https://images.unsplash.com/photo-1585156792598-9875cf22e5d8?w=600&q=80",
    ],
    description: "Кокосовый уголь премиум качества для кальяна.",
    inStock: true,
    isNew: false,
    attributes: {
      "Вес": "1 кг",
      "Количество": "72 кубика",
      "Время горения": "90 мин",
    },
  },
];

export const popularProducts = products.filter((p) => p.isNew || p.oldPrice);

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category.slug === categorySlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
