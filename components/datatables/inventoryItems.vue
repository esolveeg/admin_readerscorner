<template>
  <v-card class='' @keyup.esc="clearEditQty">
    <v-data-table
    :headers="datatable.headers"
    :items="datatable.data"
    :server-items-length="datatable.total"
    :options.sync="options"
    :loading="datatable.loading"
    class="elevation-1"
    >
      
      <template v-slot:[`item.qty`]="{ item }" >
        <span v-show="edit !== item.id" @dblclick="editQty(item.id , item.qty)" class="pointer">{{item.qty}}</span>
        <v-text-field
            v-show="edit == item.id"
            :ref="`qty-${item.id}`"
            :loading="qtyLoading"
            v-model="qty"
            @keyup.enter="updateQty(item.id)"
            label="Quanitity"
            class="dt-input"
            dark
            solo
          ></v-text-field>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          @click="deleteItem(item.id)"
          v-if="!$route.query.view"
        >
          mdi-delete
        </v-icon>
        
      </template>
      <template v-slot:no-data>
        <span>No data found</span>
      </template>
    </v-data-table>
    <modals-global-delete @deleted="deleted"/>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
  export default {
    data() {
      const doc = this.$route.query.doc
      return {
        edit: null,
        payload :{
          show: 10,
          page: 1,
          doc
        },
        options: {},
        page: 1,
        qty: null,
      }
    }, 

    computed: {
      ...mapGetters({
        datatable: 'inventory/datatable',
        qtyLoading: 'inventory/qtyLoading',
        isLoading: 'inventory/findItemsLoading'
      }),
    },
    watch: {
      options: {
        handler () {
          this.payload.show = this.options.itemsPerPage
          this.payload.page = this.options.page
          this.getData()
        },
        deep: true,
      },
    },
    methods: {
      deleteItem(id) {
        console.log(id)
        this.$store.commit('ui/setDeleteModal' , true)
        // console.log('asd')
        this.$store.commit('global/setDeleteAction' , {action:'inventory/findItems' , payload : this.payload})
        this.$store.commit('global/setDeleteItem' , {id , table : 'inventory_product'} )
      },
      deleted(){
        this.getData()
      },
      editQty(id , qty) {
        this.qty = qty
        this.edit  = id
        this.$refs[`qty-${id}`].focus()
      },  
      clearEditQty() {
        this.qty = null
        this.edit  = null
      },
      getData() {
        this.$store.dispatch('inventory/findItems' ,  this.payload)
      },
      updateQty(id){
        const payload = {
          qty :this.qty,
          id
        }
        this.$store.dispatch('inventory/updateQty' , payload)
        .then(() => {
          this.edit = null
        })
      },
      
    }
  }
</script>

<style lang="scss" scoped>
@media(max-width : 600px){
  tr td:first-child{
    background-color: $color-primary;
  }
}
</style>