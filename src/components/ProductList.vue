<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div
      class="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
    >
      <h2 class="text-2xl font-bold text-gray-800">Our Products</h2>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for products..."
        class="w-full max-w-md p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm transition-all"
      />
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
      ></div>
      <p class="mt-4 text-gray-600 font-medium">Loading products...</p>
    </div>

    <div
      v-else-if="filteredProducts.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="group relative border p-4 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md"
        :class="[
          product.stock === 0
            ? 'bg-gray-50 border-gray-200 grayscale-[0.5]'
            : 'bg-white border-gray-100',
        ]"
      >
        <div class="relative overflow-hidden rounded-xl mb-4">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
            :class="{ 'opacity-60': product.stock === 0 }"
          />

          <div class="absolute top-3 right-3 flex flex-col gap-2">
            <span
              v-if="product.stock === 0"
              class="bg-black/80 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg backdrop-blur-sm uppercase tracking-wider"
            >
              Out of Stock
            </span>
            <span
              v-else-if="product.stock <= 3"
              class="bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg shadow-lg uppercase tracking-wider animate-pulse"
            >
              Low Stock: {{ product.stock }}
            </span>
          </div>
        </div>

        <div class="space-y-2">
          <h3
            class="font-bold text-lg text-gray-800 truncate"
            :class="{ 'text-gray-400': product.stock === 0 }"
          >
            {{ product.name }}
          </h3>
          <p
            class="text-gray-500 text-sm line-clamp-4 h-20 leading-relaxed overflow-hidden"
          >
            {{ product.description }}
          </p>
        </div>

        <div class="flex justify-between items-center mt-6">
          <div class="flex flex-col">
            <span class="text-xs text-gray-400 uppercase font-semibold"
              >Price</span
            >
            <span
              class="text-xl font-bold text-gray-900"
              :class="{ 'text-gray-400': product.stock === 0 }"
            >
              ${{ product.price.toFixed(2) }}
            </span>
          </div>

          <button
            @click="basketStore.addToBasket(product)"
            :disabled="isOutOfStock(product)"
            class="px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200"
            :class="[
              isOutOfStock(product)
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700',
            ]"
          >
            {{ isOutOfStock(product) ? "Sold Out" : "Add to Bag" }}
          </button>
        </div>
      </div>
    </div>

    <div
      v-else
      class="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 mt-10"
    >
      <div class="text-5xl mb-4">🔍</div>
      <h3 class="text-xl font-bold text-gray-700">No products found</h3>
      <p class="text-gray-500">
        We couldn't find anything matching "{{ searchQuery }}".
      </p>
      <button
        @click="searchQuery = ''"
        class="mt-4 text-blue-600 font-semibold hover:underline"
      >
        Clear all filters
      </button>
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

const isOutOfStock = (product: Product) => {
  // check if the product selected is already in the basket and get its quantity
  const basketItem = basketStore.items.find(
    (item) => item.product.id === product.id,
  );
  const quantityInBasket = basketItem ? basketItem.quantity : 0;

  // check if the quantity in the basket is greater than or equal to the stock
  return quantityInBasket >= product.stock;
};

onMounted(async () => {
  try {
    products.value = await fetchProducts();
  } catch (error) {
    console.error("Failed to load products:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* grayscale */
img {
  will-change: transform, filter;
}
</style>
