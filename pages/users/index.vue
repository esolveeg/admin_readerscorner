
<template>
  <v-row>
    <v-col class="text-center">
      <builders-data-table :opts="opts"/>
    </v-col>
  </v-row>
</template>

<script>
import DatatableBuilder from "@/builders/datatable.js"
import DatatableDirector from "@/builders/datatableDirector.js"
export default {
  data(){
    const opts = new DatatableDirector(new DatatableBuilder()).makeUsers()
    // // const opts = new DatatableDirector(DatatableBuilder()).makeDocuments()
   
    return {
      opts
    }
  },
}
</script>