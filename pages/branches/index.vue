
<template>
  <v-row>
    <v-col class="text-center">
      <builders-data-table :opts="opts">
          <template v-if="$auth.user.role_id == 1" v-slot:itemActions="{item}">
              <v-btn color="primary"  @click.prevent="firstBalance(item)"><v-icon smaill>mdi-database-arrow-down-outline</v-icon>first balance</v-btn>
          </template>
          <template v-slot:modals="{}">
            <v-dialog v-model="active" max-width="500px">
              <v-card>
                  <v-card-title class="headline">Are you sure you want to define first balance to {{branch.name}}?</v-card-title>
                  <v-card-text>This action will reset all stock related to this branch to 0</v-card-text>
                  <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="cerateFirstBalance(branch)">OK</v-btn>
                  <v-spacer></v-spacer>
                  </v-card-actions>
              </v-card>
            </v-dialog>
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
    const opts = new DatatableDirector(new DatatableBuilder()).makeBranches()
    // // const opts = new DatatableDirector(DatatableBuilder()).makeDocuments()
   
    return {
      opts,
      active : false,
      branch : {}
    }
  },
  methods:{
    firstBalance(item){
      this.active = true
      this.branch = item
    },
    close(){
      this.active = false
    },
    cerateFirstBalance(item){
      // clear stock
        // create document with type first balane "6"
      this.$store.dispatch('document/create' , {type: 6 , branch_id : item.id})
      .then(res => {
          this.$router.push({name : 'documents-type-doc-doc' , params : {type : 6, doc : res.id}})
        // this.$router.push({name : "documents-doc-doc" , params : {doc : res.id}})
            // console.log('createssasdasd' , res)
        })
        .catch(err => {
            console.log(err)
        })

      // redirect to edit doc with the id
    }
  }
}
</script>