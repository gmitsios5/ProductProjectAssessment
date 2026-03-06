<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-md p-4 sticky top-0 z-10">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        <h1
          @click="currentView = 'products'"
          class="text-xl font-bold cursor-pointer text-blue-600"
        >
          My Shop
        </h1>
        <button
          @click="currentView = 'basket'"
          class="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        >
          🛒 Basket
          <span
            v-if="basketStore.items.length > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
          >
            {{ basketStore.items.length }}
          </span>
        </button>
      </div>
    </nav>

    <main class="max-w-6xl mx-auto mt-6">
      <ProductList v-if="currentView === 'products'" />
      <BasketView v-else />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ProductList from "./components/ProductList.vue";
import BasketView from "./views/BasketView.vue";
import { useBasketStore } from "./store/useBasketStore";

const currentView = ref<"products" | "basket">("products");
const basketStore = useBasketStore();
</script>
