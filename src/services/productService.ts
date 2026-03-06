import { Product } from "../types";

const DUMMY_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    description:
      "High-quality sound with active noise cancellation and 40h battery life.",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  },
  {
    id: 2,
    name: "Minimalist Mechanical Keyboard",
    price: 125.0,
    description:
      "Compact 65% layout with brown tactile switches and RGB lighting.",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80",
  },
  {
    id: 3,
    name: "Smart Watch Series X",
    price: 299.0,
    description: "Track your fitness, heart rate, and notifications in style.",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
  },
  {
    id: 4,
    name: "Leather Laptop Sleeve",
    price: 45.0,
    description: "Handcrafted genuine leather sleeve for 14-inch laptops.",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80",
  },
];

export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_PRODUCTS);
    }, 500);
  });
};
