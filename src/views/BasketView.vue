<script setup lang="ts">
import { useBasketStore } from "../store/useBasketStore";

const basketStore = useBasketStore();

const confirmClear = () => {
  if (confirm("Είσαι σίγουρος ότι θέλεις να αδειάσεις το καλάθι;")) {
    basketStore.clearBasket();
  }
};
</script>
<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">Your Shopping Basket</h2>
    <div
      v-if="basketStore.items.length === 0"
      class="text-center py-10 border rounded-lg"
    >
      <p class="text-gray-500">Your basket is empty.</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="item in basketStore.items"
        :key="item.product.id"
        class="flex items-center justify-between border-b pb-4"
      >
        <div class="flex items-center gap-4">
          <img
            :src="item.product.image"
            class="w-16 h-16 object-cover rounded"
          />
          <div>
            <h3 class="font-medium">{{ item.product.name }}</h3>
            <p class="text-gray-600">${{ item.product.price }}</p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center border rounded">
            <v-btn
              @click="basketStore.updateQuantity(item.product.id, -1)"
              class="px-3 py-1 hover:bg-gray-100"
            >
              -
            </v-btn>
            <span class="px-3 py-1 font-mono"
              >{{ item.quantity }}{{ "test" }}</span
            >
            <v-btn
              @click="basketStore.updateQuantity(item.product.id, 1)"
              class="px-3 py-1 hover:bg-gray-100"
            >
              +
            </v-btn>
          </div>

          <v-btn
            @click="basketStore.removeFromBasket(item.product.id)"
            class="text-red-500 hover:text-red-700"
          >
            Remove
          </v-btn>
        </div>
      </div>
      <div v-if="basketStore.items.length > 0" class="mr-0">
        <v-btn
          @click="confirmClear"
          class="text-sm text-red-600 hover:text-red-800 font-medium transition-colors border border-red-200 px-3 py-1 rounded-md hover:bg-red-50"
        >
          🗑️ Clear Basket
        </v-btn>
      </div>
      <div
        class="mt-8 p-4 bg-gray-50 rounded-lg flex justify-between items-center"
      >
        <span class="text-lg font-semibold">Total Amount:</span>
        <span class="text-2xl font-bold text-blue-600"
          >${{ basketStore.totalAmount.toFixed(2) }}</span
        >
      </div>
    </div>
  </div>
</template>
