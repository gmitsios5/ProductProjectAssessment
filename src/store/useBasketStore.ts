import { defineStore } from "pinia";
import { ref, computed, watch } from "vue"; // Προσθέτουμε το watch
import { Product, BasketItem } from "../types";

export const useBasketStore = defineStore("basket", () => {
  const savedItems = localStorage.getItem("basket_items");
  const items = ref<BasketItem[]>(savedItems ? JSON.parse(savedItems) : []);

  watch(
    items,
    (newItems) => {
      localStorage.setItem("basket_items", JSON.stringify(newItems));
    },
    { deep: true },
  );

  const totalAmount = computed(() => {
    return items.value.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  });

  function addToBasket(product: Product) {
    const existingItem = items.value.find(
      (item) => item.product.id === product.id,
    );

    const currentQtyInBasket = existingItem ? existingItem.quantity : 0;

    if (product.stock > currentQtyInBasket) {
      if (existingItem) {
        existingItem.quantity++;
      } else {
        items.value.push({ product, quantity: 1 });
      }
    } else {
      alert("Item out of stock!");
    }
  }

  function clearBasket() {
    if (items.value.length > 0) items.value = [];
  }

  function removeFromBasket(productId: number) {
    items.value = items.value.filter((item) => item.product.id !== productId);
  }

  function updateQuantity(productId: number, newQuantity: number) {
    const item = items.value.find((i) => i.product.id === productId);
    if (!item) return;

    // If the new quantity exceeds stock, set it to max available and alert the user
    if (newQuantity > item.product.stock) {
      alert(`Συγγνώμη, υπάρχουν μόνο ${item.product.stock} τεμάχια διαθέσιμα.`);
      item.quantity = item.product.stock; // Set quantity to max available
      return;
    }

    if (newQuantity <= 0) {
      removeFromBasket(productId);
    } else {
      item.quantity = newQuantity;
    }
  }

  const totalItemsCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  return {
    items,
    totalAmount,
    addToBasket,
    clearBasket,
    removeFromBasket,
    updateQuantity,
    totalItemsCount,
  };
});
