
<template>
  <v-row>
    <v-col class="text-center">
      <orders />
    </v-col>
  </v-row>
</template>
<script>
import orders from "@/components/datatables/orders.vue"
export default {
  components:{
    orders
  }
}
</script>