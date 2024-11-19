<script setup lang="ts">
import type { MenuData } from '~/types/menu'

const { data: menuData } = await useFetch<MenuData>('/menu.json', {
  baseURL: window?.location?.origin || 'http://localhost:3000'
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-center mb-8">DSP Cafe Menu</h1>
      <div v-if="menuData" class="space-y-12">
        <MenuCategory v-for="category in menuData.menu" :key="category.category" :category="category" />
      </div>
      <div v-else class="text-red-500 text-center">
        Error loading menu. Please try again later.
      </div>
    </div>
  </div>
</template>