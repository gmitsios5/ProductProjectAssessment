export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: string;
  stock: number;
}

export interface BasketItem {
  product: Product;
  quantity: number;
}
