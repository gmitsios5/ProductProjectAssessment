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
  };

  it("πρέπει να ξεκινάει με άδειο καλάθι", () => {
    const store = useBasketStore();
    expect(store.items.length).toBe(0);
  });

  it("πρέπει να προσθέτει προϊόν στο καλάθι", () => {
    const store = useBasketStore();
    store.addToBasket(mockProduct);

    expect(store.items.length).toBe(1);
    expect(store.items[0].product.id).toBe(1);
    expect(store.items[0].quantity).toBe(1);
  });

  it("πρέπει να αυξάνει την ποσότητα αν το προϊόν υπάρχει ήδη", () => {
    const store = useBasketStore();
    store.addToBasket(mockProduct);
    store.addToBasket(mockProduct);

    expect(store.items.length).toBe(1);
    expect(store.items[0].quantity).toBe(2);
  });

  it("πρέπει να υπολογίζει σωστά το συνολικό ποσό (totalAmount)", () => {
    const store = useBasketStore();
    const product2: Product = { ...mockProduct, id: 2, price: 50 };

    store.addToBasket(mockProduct);
    store.addToBasket(product2);

    expect(store.totalAmount).toBe(150);
  });
});
