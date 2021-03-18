<template>
  <v-card class=''>
    <v-data-table
    :headers="datatable.headers"
    :items="datatable.data"
    :loading="datatable.loading"
    sort-by="created_at"
    class="elevation-1"
    >
      <template v-slot:top>
        <div class=""> 
          <v-toolbar
            flat
          >
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  :loading="createLoading"
                  @click.prevent="open"
                >
                  New Item
              </v-btn>
          </v-toolbar>
        </div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <span>No data found</span>
      </template>
    </v-data-table>
    <modals-inventory-create/>
    <modals-global-delete @deleted="deleted"/>

  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      title : "Inventory documents",
      payload:{
        show : 10,
        page: 1,
      },
    }),

    computed: {
      ...mapGetters({
        datatable: 'inventory/documentsDatatable',
        isLoading: 'inventory/documentsLoading',
        createLoading: 'inventory/createLoading',
      }),
    },
    methods: {
      getData() {
        this.$store.dispatch('inventory/get' , this.payload)
      },
      editItem(item) {
        this.$router.push({path : "inventory/edit" , query : {doc : item.id}})
      },
      deleteItem(item) {
        this.$store.commit('ui/setDeleteModal' , true)
        this.$store.commit('global/setDeleteItem' , {id:item.id , table : 'inventories'} )
        this.$store.commit('global/setDeleteAction' , {action:'inventory/get' , payload : this.payload})
      },
      deleted(){
        this.getData()
      },
      open(){
        if(this.$auth.user.branch){
          this.$store.dispatch("inventory/create")
          .then(res => {
            this.$router.push({name : "inventory-edit" , query : {doc : res.id}})
          })
        } else {
          this.$store.commit("ui/setCreateModal" , true)
        }
      }
    },
    created(){
      this.getData()
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