<script setup lang="ts">
import { ref } from 'vue';
import { filters } from '../../store';

const selectedStore = ref<null | number>(null);

const updateStoreFilter = (store: number) => {
    selectedStore.value = selectedStore.value === store ? null : store;
    filters.value.store = selectedStore.value;
};

</script>

<template>
    <div class="mb-3 border-round-sm font-bold">Stores</div>
    <div>
        <div class="flex gap-1">
            <Button label="Store 1" size="small" @click="updateStoreFilter(1)" :disabled="filters.store === 1"/>
            <Button label="Store 2" size="small" @click="updateStoreFilter(2)" :disabled="filters.store === 2"/>
        </div>
    </div>
</template>../../store