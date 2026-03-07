<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <h2
        class="text-3xl font-extrabold text-gray-900 tracking-tight text-blue-600"
      >
        {{ "Basket" }}
      </h2>
      <span
        class="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase"
      >
        {{ basketStore.totalItemsCount }} Items
      </span>
    </div>

    <div
      v-if="basketStore.items.length === 0"
      class="text-center py-20 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl"
    >
      <div class="text-6xl mb-4">🛒</div>
      <p class="text-gray-500 text-lg font-medium">
        {{ "Your basket is currently empty." }}
      </p>
      <button
        @click="$emit('go-to-products')"
        class="mt-4 inline-block text-blue-600 font-bold hover:underline bg-transparent border-none cursor-pointer"
      >
        Go back to shopping →
      </button>
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="item in basketStore.items"
        :key="item.product.id"
        class="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-5 w-full sm:w-auto">
          <img
            :src="item.product.image"
            class="w-20 h-20 object-cover rounded-xl shadow-inner bg-gray-50"
          />
          <div class="flex-1">
            <h3 class="font-bold text-gray-800 leading-tight">
              {{ item.product.name }}
            </h3>
            <p class="text-blue-600 font-bold text-sm mt-1">
              ${{ item.product.price.toFixed(2) }}
            </p>
            <p class="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
              Stock available: {{ item.product.stock }}
            </p>
          </div>
        </div>

        <div class="flex flex-col items-center gap-2">
          <div
            class="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white"
          >
            <button
              @click="
                basketStore.updateQuantity(item.product.id, item.quantity - 1)
              "
              class="px-4 py-2 hover:bg-red-50 text-red-500 transition-colors font-bold"
            >
              −
            </button>

            <span
              class="px-5 py-2 font-mono font-black text-gray-700 bg-gray-50 border-x-2 border-gray-100"
            >
              {{ item.quantity }}
            </span>

            <button
              @click="
                basketStore.updateQuantity(item.product.id, item.quantity + 1)
              "
              :disabled="item.quantity >= item.product.stock"
              class="px-4 py-2 transition-all font-bold"
              :class="[
                item.quantity >= item.product.stock
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  : 'hover:bg-green-50 text-green-600',
              ]"
            >
              +
            </button>
          </div>

          <transition name="fade">
            <span
              v-if="item.quantity >= item.product.stock"
              class="text-[9px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full uppercase tracking-tighter"
            >
              Max available reached
            </span>
          </transition>
        </div>

        <div
          class="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end"
        >
          <div class="text-right">
            <p class="text-xs text-gray-400 uppercase font-bold">Subtotal</p>
            <p class="text-lg font-black text-gray-900">
              ${{ (item.product.price * item.quantity).toFixed(2) }}
            </p>
          </div>

          <button
            @click="basketStore.removeFromBasket(item.product.id)"
            class="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            title="Remove item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 mt-10 border-t-2 border-gray-100"
      >
        <button
          @click="confirmClear"
          class="flex items-center gap-2 text-sm text-gray-400 hover:text-red-600 font-bold transition-colors group"
        >
          <span class="text-xl group-hover:animate-bounce">🗑️</span> Clear
          Entire Basket
        </button>

        <div
          class="w-full sm:w-80 bg-blue-600 p-6 rounded-3xl shadow-xl shadow-blue-200 text-white transform hover:scale-105 transition-transform"
        >
          <div class="flex justify-between items-center mb-2 opacity-80">
            <span class="text-sm font-bold uppercase tracking-widest"
              >Total to Pay</span
            >
            <span class="text-xs">{{ basketStore.items.length }} Items</span>
          </div>
          <div class="flex justify-between items-baseline">
            <span class="text-3xl font-black"
              >${{ basketStore.totalAmount.toFixed(2) }}</span
            >
            <button
              class="bg-white text-blue-600 px-4 py-1.5 rounded-xl text-xs font-black uppercase hover:bg-blue-50"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBasketStore } from "../store/useBasketStore";

const basketStore = useBasketStore();
const emit = defineEmits(["goToProducts"]);
const confirmClear = () => {
  if (confirm("Are you sure you want to empty your entire basket?")) {
    basketStore.clearBasket();
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
