
<template>
  <v-row>
    <v-col class="text-center">
      <builders-data-table :opts="opts">
        <template v-slot:actions>
          <v-btn
              color="primary"
              dark
              class="mb-2"
              @click.prevent="$router.push({name : 'documents-type-type' , params : {type : 5}})"
            >
              View documents
          </v-btn>
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
    const opts = new DatatableDirector(new DatatableBuilder()).makeProducts()
    // // const opts = new DatatableDirector(DatatableBuilder()).makeDocuments()
   
    return {
      opts
    }
  },
}
</script>