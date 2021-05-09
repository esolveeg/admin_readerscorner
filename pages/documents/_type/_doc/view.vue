
<template>
    <v-row>
      <v-col cols="12">
        <builders-data-table :opts="dataTableOpts"/>
      </v-col>
      <!-- <v-col class="text-center" :dark="false" cols="12">
        <invoices-main/>
        <invoices-reciept/>
      </v-col> -->

      
    </v-row>
</template>
<script>

import DatatableBuilder from "@/builders/datatable.js"
import DatatableDirector from "@/builders/datatableDirector.js"

export default {
  data(){
      const dataTableOpts = new DatatableDirector(
          new DatatableBuilder()
      ).makeDocumentItems(this)
      
    return {
      dataTableOpts,
    }
  },
 
}
</script>