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
        datatable: 'product/datatable',
        isLoading: 'product/datatableLoading'
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
      getData() {
        this.$store.dispatch('product/getDocumentProducts' ,  this.payload)
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