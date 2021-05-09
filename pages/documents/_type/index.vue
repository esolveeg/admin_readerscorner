
<template>
  <v-row>
    <v-col class="text-center">
      <builders-data-table :opts="opts">
         <template v-slot:actions>
          <v-btn v-if="$route.params.type == 0 || $route.params.type == 2" @click="makeRetun()" color="danger" class="mr-4">
            <v-icon
              small
              v-if="opts.editable !== false"
              class="mr-2"
              
            >
              mdi-keyboard-return
            </v-icon>
            New Return
          </v-btn>
          </template> 
      <template v-slot:modals>
         <modals-global-create-doc/>
         <v-dialog
          v-model="active"
          max-width="500px"
          > 
            <builders-form @created="active = false" :opts="formOpts"/>
          </v-dialog>
        </template>
      </builders-data-table>
    </v-col>
  </v-row>
</template>

<script>
import FormDirector from "@/builders/formDirector.js"
import FormBuilder from "@/builders/form.js"
import DatatableBuilder from "@/builders/datatable.js"
import DatatableDirector from "@/builders/datatableDirector.js"
import {getTrTitle} from '@/common/Helpers.js'
export default {
  data(){
    const opts = new DatatableDirector(new DatatableBuilder()).makeDocuments(getTrTitle(this.$route.params.type))
    // // const opts = new DatatableDirector(DatatableBuilder()).makeDocuments()
   const formOpts = new FormDirector(
                  new FormBuilder())
                  .makeReturnDoc()
    return {
      opts,
      active: false,
      formOpts,
    }
  },
  methods :{
    makeRetun(){
        this.active = true
    }
  }
}
</script>