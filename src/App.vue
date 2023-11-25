<script setup lang="ts">
import Fieldset from 'primevue/fieldset';
import Brands from './components/filters/Brands.vue';
import Stores from './components/filters/Stores.vue';
import Years from './components/filters/Years.vue';
import Products from './components/products/Products.vue';
import { convertBy, filters } from './store';



const clearFilters = () => {
  filters.value = {
    brand: null,
    year: null,
    store: null,
  };
};
</script>

<template>
  <div class="grid">
    <div class="col-4">
      <Fieldset>
        <template #legend>
          <div class="flex align-items-center gap-5">
            <span class="font-bold">Filters</span>
            <Button label="clear" severity="warning" text size="small" @click="clearFilters"
              :disabled="Object.values(filters).every(item => !item)" />
            <span class="p-buttonset">
              <Button label="RUB" size="small" :disabled="convertBy === 'RUB'" @click="convertBy = 'RUB'"/>
              <Button label="USD" size="small" :disabled="convertBy === 'USD'" @click="convertBy = 'USD'"/>
            </span>
          </div>
        </template>
        <Brands />
        <Divider />
        <Years />
        <Divider />
        <Stores />
      </Fieldset>
    </div>
    <div class="col-8">
      <div class="p-3">
        <Products />
      </div>

    </div>
  </div>
</template>
./store