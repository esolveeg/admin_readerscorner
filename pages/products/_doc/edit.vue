
<template>
    <v-row>
      <v-col class="text-center"  cols="12" >
        <v-card class="pa-4">
          <builders-form :opts="formOpts" ></builders-form>
        </v-card>
      </v-col>
      <v-col class="text-center" cols="12">
        <builders-data-table :opts="dataTableOpts"/>
      </v-col>
       <v-col class="text-center" cols="12" v-if="$auth.user.role.name == 'admin' && !$route.query.view">
        <v-btn class="block success w-full" @click.prevent="$store.commit('ui/closeModal' , true)">
          Save
        </v-btn>
        <modals-global-close-doc/>
      </v-col>
    </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
import FormBuilder from "@/builders/form.js"
import FormDirector from "@/builders/formDirector.js"
import DatatableBuilder from "@/builders/datatable.js"
import DatatableDirector from "@/builders/datatableDirector.js"
export default {
  mounted(){
    console.log(this.$route.name)
  },
  data(){
      const dataTableOpts = new DatatableDirector(
          new DatatableBuilder()
      ).makeDocumentItems()
       const formOpts = new FormDirector(
                  new FormBuilder())
                  .makeEditAddProduct()
    return {
      valid:false,
      formOpts,
      dataTableOpts,
      productErr:'',  
      closeModal:false,
      rules :{
        product: [
          v => !!v || 'product is required',
          v => v.length >= 10 || 'ISBN must be more than than or equals 10 characters',
        ],
        qty: [
          v => !!v || 'qty is required',
          
        ],
      },
      form: {
        product : '',
        qty : 1,
      },
      item :null,
    }
  },
  computed: {
      ...mapGetters({
        productLoading: 'global/productLoading',
        closeLoading: 'inventory/closeLoading'
      }),
    },
  methods:{
    addItem(){
      this.form.doc = this.$route.query.doc
      this.$route.query.branch ? this.form.branch = this.$route.query.branch :''
      this.$store.dispatch('inventory/insertItem' , this.form)
      .then(() => {
        this.$refs.form.resetValidation()
        this.form = {
          product : '',
          qty : 1,
        },
        this.$refs.product.focus()
      })
    },
    closeDocument(){
      this.$store.dispatch('inventory/close' , this.$route.query.doc)
      .then(() => {
        this.$router.push({name: 'inventory'})
      })
    },
    findProduct(){
      this.$store.dispatch('global/getProduct' , this.form.product)
      .then(res => {
        this.productErr = ""
        this.item = res
        this.$refs.qty.focus()
      })
      .catch(() => {
        this.productErr = "this product not found"
      })
    },
    reset () {
      this.$refs.form.reset()
    },
  },
}
</script>