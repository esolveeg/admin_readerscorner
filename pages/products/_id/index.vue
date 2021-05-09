
<template>
  <v-row>
    <v-col class="text-center">
      <builders-form :opts="opts"></builders-form>
    </v-col>
  </v-row>
</template>

<script>
import FormBuilder from "@/builders/form.js"
import FormDirector from "@/builders/formDirector.js"
export default {
  data(){
    const opts = new FormDirector(new FormBuilder()).makeEditAddProduct()
    // // const opts = new DatatableDirector(DatatableBuilder()).makeDocuments()
   
    return {
      opts
    }
  },
}
</script>