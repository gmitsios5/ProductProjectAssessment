<template>
  <div class="p-6">
    <div class="mb-8">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for products..."
        class="w-full max-w-md p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>

    <div v-if="loading" class="text-center">Loading products...</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="border p-4 rounded-xl shadow-sm bg-white"
      >
        <img
          :src="product.image"
          class="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 class="font-bold text-lg">{{ product.name }}</h3>
        <p class="text-gray-600 text-sm mb-2">{{ product.description }}</p>
        <div class="flex justify-between items-center">
          <span class="text-xl font-semibold">${{ product.price }}</span>
          <button
            @click="basketStore.addToBasket(product)"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Basket
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="filteredProducts.length === 0 && !loading"
      class="text-center text-gray-500 mt-10"
    >
      No products found matching "{{ searchQuery }}".
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { fetchProducts } from "../services/productService";
import { Product } from "../types";
import { useBasketStore } from "../store/useBasketStore";

const products = ref<Product[]>([]);
const searchQuery = ref("");
const loading = ref(true);
const basketStore = useBasketStore();

const filteredProducts = computed(() => {
  return products.value.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

onMounted(async () => {
  products.value = await fetchProducts();
  loading.value = false;
});
</script>
