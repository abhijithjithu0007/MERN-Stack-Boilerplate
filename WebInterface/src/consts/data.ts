export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string[];
  inStock: boolean;
  dateAdded: string;
  popularity: number;
}

export interface FilterState {
  search: string;
  priceRange: [number, number];
  categories: string[];
  rating: number;
  inStock: boolean | null;
  sortBy: "price-asc" | "price-desc" | "popularity" | "newest";
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    image:
      "https://i.pinimg.com/736x/a8/33/7f/a8337f50ffaf22a9f4c350ed63362ec8.jpg",
    rating: 4.5,
    category: ["Electronics", "Audio"],
    inStock: true,
    dateAdded: "2024-12-10",
    popularity: 85,
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    image:
      "https://i.pinimg.com/736x/c0/21/ef/c021ef014b1e51778b742a6d932a8ae0.jpg",
    rating: 4.2,
    category: ["Electronics", "Wearables"],
    inStock: true,
    dateAdded: "2024-12-15",
    popularity: 90,
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 79.99,
    image:
      "https://i.pinimg.com/736x/c5/b1/33/c5b133d8f05f359e1d6c792bea023285.jpg",
    rating: 3.8,
    category: ["Electronics", "Audio"],
    inStock: false,
    dateAdded: "2024-11-05",
    popularity: 70,
  },
  {
    id: "4",
    name: "Laptop Backpack",
    price: 49.99,
    image:
      "https://i.pinimg.com/736x/ae/61/c4/ae61c4e05ea3b6c475bb46c0ccd14c24.jpg",
    rating: 4.7,
    category: ["Accessories", "Bags"],
    inStock: true,
    dateAdded: "2024-12-01",
    popularity: 65,
  },
  {
    id: "5",
    name: "Coffee Maker",
    price: 129.99,
    image:
      "https://i.pinimg.com/736x/7d/41/70/7d417027c43ea19281a2baba18d14946.jpg",
    rating: 4.0,
    category: ["Home", "Kitchen"],
    inStock: true,
    dateAdded: "2024-10-20",
    popularity: 75,
  },
  {
    id: "6",
    name: "Yoga Mat",
    price: 29.99,
    image:
      "https://i.pinimg.com/736x/eb/ec/f4/ebecf427dec18898d64d5c06fd091b01.jpg",
    rating: 4.3,
    category: ["Sports", "Fitness"],
    inStock: true,
    dateAdded: "2024-12-18",
    popularity: 60,
  },
  {
    id: "7",
    name: "Desk Lamp",
    price: 39.99,
    image:
      "https://i.pinimg.com/736x/ad/36/13/ad36133ec7adc0d347e69ec46cfd7b05.jpg",
    rating: 3.5,
    category: ["Home", "Lighting"],
    inStock: false,
    dateAdded: "2024-11-15",
    popularity: 55,
  },
  {
    id: "8",
    name: "Wireless Mouse",
    price: 24.99,
    image:
      "https://i.pinimg.com/736x/7c/5d/fe/7c5dfee0c2b36612bcb7a392915ea43a.jpg",
    rating: 4.1,
    category: ["Electronics", "Computer Accessories"],
    inStock: true,
    dateAdded: "2024-12-05",
    popularity: 80,
  },
  {
    id: "9",
    name: "Water Bottle",
    price: 19.99,
    image:
      "https://i.pinimg.com/736x/ac/f5/2c/acf52c313c4b320fda1fce42c66a8486.jpg",
    rating: 4.6,
    category: ["Sports", "Hydration"],
    inStock: true,
    dateAdded: "2024-12-12",
    popularity: 65,
  },
  {
    id: "10",
    name: "Portable Charger",
    price: 49.99,
    image:
      "https://i.pinimg.com/736x/2c/c9/df/2cc9dfcbff71e6606f85f7b37471ce89.jpg",
    rating: 4.4,
    category: ["Electronics", "Accessories"],
    inStock: true,
    dateAdded: "2024-11-25",
    popularity: 85,
  },
];

export const allCategories = Array.from(
  new Set(mockProducts.flatMap((product) => product.category))
);

export const priceRange: [number, number] = [
  Math.min(...mockProducts.map((p) => p.price)),
  Math.max(...mockProducts.map((p) => p.price)),
];
