
<template>
  <v-row>
    <v-col class="text-center">
      <builders-data-table :opts="opts">
       
      <template v-slot:modals>
         <modals-global-create-doc/>
        </template>
      </builders-data-table>
    </v-col>
  </v-row>
</template>

<script>
import DatatableBuilder from "@/builders/datatable.js"
import DatatableDirector from "@/builders/datatableDirector.js"
export default {
  data(){
    const opts = new DatatableDirector(DatatableBuilder()).makeDocuments()
   
    return {
      opts
    }
  }
}
</script>