<script setup lang="ts">
import brands from '../../db/brands.json'
import { filters } from '../../store';

const setBrandFilter = (id: number) => {
    filters.value.brand = id
}
</script>

<template>
    <div class="mb-3 border-round-sm font-bold">Brands</div>
    <div>
        <div class="flex flex-column gap-1">
            <Button v-for="brand of brands" :disabled="filters.brand === brand.id" :label="brand.name" size="small" @click="setBrandFilter(brand.id)" />
        </div>
    </div>
</template>