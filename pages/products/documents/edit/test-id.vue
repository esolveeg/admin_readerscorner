
<template>
    <v-row>
      <v-col class="text-center" v-if="!$route.query.view"  cols="12">
        <forms-products-create @created="productCreated"/>
      </v-col>
      <v-col class="text-center" cols="12">
        <datatables-product-document/>
      </v-col>
       <v-col class="text-center" cols="12" v-if="$auth.user.role.name == 'admin' && !$route.query.view">
        <v-btn class="block success w-full" @click.prevent="closeModal = true">
          Save
        </v-btn>
        <v-dialog v-model="closeModal" max-width="500px">
          <v-card>
              <v-card-title class="headline">Are you sure you want to close this document?</v-card-title>
              <v-card-text class="pa-4">This action will update the stock on the selected branch</v-card-text>
              <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeModal = false">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="closeDocument" :loading="closeLoading">Yes I'm sure</v-btn>
              <v-spacer></v-spacer>
              </v-card-actions>
          </v-card>
      </v-dialog>
      </v-col>
    </v-row>
</template>
<script>
import editDocument from "@/mixins/editDocument.js"
export default {
  data(){
    const doc = this.$route.params.id
    return {
      form: {
        product : null,
        doc,
      },
      rules :{
        product: [
          v => !!v || 'product is required',
          v => v.length >= 10 || 'ISBN must be more than than or equals 10 characters',
        ],
        qty: [
          v => !!v || 'qty is required',
          
        ],
      },
    }
  },
  methods :{
    productCreated(){
      console.log('aas;lmf')
      this.insertItem()
      console.log(product)
      console.log('productproduct')
      console.log('productForm')
    },
    insertItem(){
      this.$store.dispatch('document/insertItem' , this.form)
    },
  },
  mixins :[editDocument ],
}
</script>