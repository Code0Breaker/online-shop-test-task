import axios from 'axios'
import { ref, watch } from 'vue'
import brands from './db/brands.json'
import catalog from './db/catalog.json'
import stock from './db/stock.json'
import { ICart, IProduct } from './interfaces'
export const filters = ref<{
  brand: null | number,
  year: null | number,
  store: null | number
}>({
  brand: null,
  year: null,
  store: null,
})


export const items = ref<IProduct[] | null>(null)
export const cart = ref<ICart[]>([])

export const rubToUsdRate = ref<number | null>(null);
export const convertBy = ref<"RUB" | "USD">("RUB")

watch(() => [...Object.values(filters.value), convertBy.value], async () => {
  try {

    const { data: { conversion_rates } } = await axios.get(`https://v6.exchangerate-api.com/v6/979f0ebe2fe31541fe0d70f8/latest/${convertBy.value}`);

    rubToUsdRate.value = conversion_rates.RUB;

    const products = catalog.map(product => {
      const brand = brands.find(item => item.id === product.brand);
      const stockItem = stock.find(item => item.art === product.art);

      return {
        ...product,
        brand: brand || { id: 0, name: 'Unknown Brand' },
        stock: stockItem || { art: '', st1: 0, st2: 0 },
      };
    });
    
    items.value = products.filter(product => {
      const brandFilter = !filters.value.brand || product.brand.id === filters.value.brand;
      const yearFilter = !filters.value.year || product.year === filters.value.year;
      const storeFilter =
        !filters.value.store ||
        (product.stock &&
          ((filters.value.store === 1 && product.stock.st1 > 0) ||
            (filters.value.store === 2 && product.stock.st2 > 0)));
    
      return brandFilter && yearFilter && storeFilter;
    });

    if (!!rubToUsdRate.value) {
      items?.value?.forEach(product => {
        if (product.stock && !!rubToUsdRate.value) {
          product.price = product.price / rubToUsdRate.value;
        }
      });
    }
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
  }
}, { immediate: true });
