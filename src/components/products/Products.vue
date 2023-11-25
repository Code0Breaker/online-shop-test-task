<template>
    <div class="card">
        <DataTable :value="items" paginator :rows="4" tableStyle="min-width: 50rem">
            <Column field="name" header="Name" style="width: 15%"></Column>
            <Column field="brand.name" header="Brand" style="width: 15%"></Column>
            <Column field="price" header="Price" style="width: 15%" sortable></Column>
            <Column field="year" header="Year" style="width: 15%"></Column>
            <Column field="stock" header="In stock" style="width: 20%">
                <template #body="{ data }">{{ stockToShow(data.stock) }}</template>
            </Column>
            <Column style="flex: 0 0 4rem">
                <template #body="{ data }">
                    <Button type="button" :disabled="stockToShow(data.stock) === 0" @click="addToCart(data)">add to
                        cart</Button>
                </template>
            </Column>
        </DataTable>
    </div>

    <div class="card xl:flex xl:justify-content-center">
        <OrderList :class="cart.length === 0 && 'hidden'" v-model="cart" listStyle="height:auto" dataKey="id">
            <template #header> Cart </template>
            <template #item="slotProps">
                <div class="flex flex-wrap p-2 align-items-center gap-3">

                    <div class="flex-1 flex flex-column gap-2">
                        <span class="font-bold">{{ slotProps.item.name }}</span>
                        <div class="flex align-items-center gap-2">

                            <span>{{ slotProps.item.category }}</span>
                        </div>
                    </div>
                    <span class="font-bold text-900"> {{ slotProps.item.price }}</span>
                    <span class="font-bold text-900"> {{ slotProps.item.count }}</span>
                </div>
            </template>
        </OrderList>

    </div>
</template>

<script setup lang="ts">
import { ICart, IProduct, IStock } from '../../interfaces';
import { cart, filters, items } from '../../store';

const stockToShow = (itemStock: IStock) => {
    switch (filters.value.store) {
        case 1:
            return itemStock.st1
        case 2:
            return itemStock.st2
        default:
            return itemStock.st1 + itemStock.st2
    }
}

const addToCart = (data: IProduct) => {
    const foundIndex = cart.value.findIndex(item => item.art === data.art);
    const cartItem: ICart = {
        ...data,
        count: 1
    };

    const updateStock = (itemStock: IStock | undefined, store: number | null) => {
        if (itemStock && (!store || (store === 1 && itemStock.st1 > 0) || (store === 2 && itemStock.st2 > 0))) {
            if (store) {
                (itemStock as unknown as { [key: string]: number })[`st${store}`]--;
            } else {
                itemStock.st1 > 0 ? itemStock.st1-- : itemStock.st2--;
            }
        }
    };

    if (foundIndex !== -1) {
        const foundItem = cart.value[foundIndex];
        const foundIndexFromItems = (items.value as IProduct[]).findIndex(item => item.art === foundItem.art);

        foundItem.count++;

        if (foundIndexFromItems !== -1) {
            updateStock((items.value as IProduct[])[foundIndexFromItems]?.stock, filters.value.store);
        }
    } else {
        cart.value.push(cartItem);

        const foundIndexFromItems = (items.value as IProduct[]).findIndex(item => item.art === data.art);
        if (foundIndexFromItems !== -1) {
            updateStock((items.value as IProduct[])[foundIndexFromItems]?.stock, filters.value.store);
        }
    }
};



</script>../../store