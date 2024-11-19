<script setup lang="ts">
import type { MenuItem } from '~/types/menu'

defineProps<{
  item: MenuItem
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex justify-between items-start mb-2">
      <h3 class="text-lg font-semibold text-gray-800">{{ item.name }}</h3>
      <span class="text-orange-500 font-bold">Nu. {{ item.price }}</span>
    </div>
    <p v-if="item.description" class="text-gray-600 text-sm mb-3">
      {{ item.description }}
    </p>
    <div v-if="item.options" class="flex gap-2 mt-2">
      <span
        v-for="option in item.options"
        :key="option"
        class="text-xs bg-gray-100 px-2 py-1 rounded"
      >
        {{ option }}
      </span>
    </div>
    <button class="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600">
      Order Now
    </button>
  </div>
</template>