
<template>
  <v-row>
    <v-col class="text-center">
      <products />
    </v-col>
  </v-row>
</template>
<script>
import products from "@/components/datatables/products.vue"
export default {
  components:{
    products
  }
}
</script>