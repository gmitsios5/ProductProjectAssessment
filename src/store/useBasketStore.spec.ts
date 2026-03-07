import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach } from "vitest";
import { useBasketStore } from "./useBasketStore";
import { Product } from "../types";

describe("Basket Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const mockProduct: Product = {
    id: 1,
    name: "Test Product",
    price: 100,
    category: "Electronics",
    image: "",
    stock: 5,
  };

  it("has to start with an empty basket", () => {
    const store = useBasketStore();
    expect(store.items.length).toBe(0);
  });

  it("has to add a product to the basket", () => {
    const store = useBasketStore();
    store.addToBasket(mockProduct);

    expect(store.items.length).toBe(1);
    expect(store.items[0].product.id).toBe(1);
    expect(store.items[0].quantity).toBe(1);
  });

  it("has to increase the quantity if the product already exists", () => {
    const store = useBasketStore();
    store.addToBasket(mockProduct);
    store.addToBasket(mockProduct);

    expect(store.items.length).toBe(1);
    expect(store.items[0].quantity).toBe(2);
  });

  it("has to calculate the total amount correctly", () => {
    const store = useBasketStore();
    const product2: Product = { ...mockProduct, id: 2, price: 50 };

    store.addToBasket(mockProduct);
    store.addToBasket(product2);

    expect(store.totalAmount).toBe(150);
  });

  it("should remove a product entirely from the basket", () => {
    const store = useBasketStore();
    store.addToBasket(mockProduct);
    store.removeFromBasket(mockProduct.id);

    expect(store.items.length).toBe(0);
  });
});
