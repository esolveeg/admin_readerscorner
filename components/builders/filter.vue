<template>
    <v-select
        :items="filter.items"
        @changed="$emit('changed' , $event.targer.value)"
        :clearable="filter.clearable"
        :item-text="filter.itemText"
        :item-value="filter.itemValue"
        :label="filter.label"
    ></v-select>
</template>

<script>
export default {
    props:['filter']
}
</script>