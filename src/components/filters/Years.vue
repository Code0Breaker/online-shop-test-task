<script setup lang="ts">
import catalog from '../../db/catalog.json'
import { filters } from '../../store';

const years = new Set(catalog.map(item => item.year))
const setYearFilter = (choosenYear: number) => {
    filters.value.year = choosenYear
}
</script>

<template>
    <div class="mb-3 border-round-sm font-bold">Years</div>
    <div>
        <div class="flex flex-column gap-1">
            <Button v-for="year of years" :disabled="filters.year === year" :label="year.toString()" size="small" @click="setYearFilter(year)" />
        </div>
    </div>
</template>../../store