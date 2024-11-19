<script setup lang="ts">
import type { MenuCategory } from '~/types/menu'

defineProps<{
  category: MenuCategory
}>()
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-orange-400 pb-2">
      {{ category.category }}
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MenuItem
        v-for="item in category.items"
        :key="item.name"
        :item="item"
      />
    </div>
  </div>
</template>