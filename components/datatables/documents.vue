<template>
  <v-card class=''>
    <v-data-table
    :options.sync="options"
    :server-items-length="datatable.total"
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
            <div class="d-flex pt-12 pb-12 items-center mr-8">
              <v-select
                  :items="types"
                  item-text="text"
                  item-value="value"
                  clearable
                  v-model="form.closed"
                  label="type"
              ></v-select>
              <v-select
                  v-if="$auth.user.branch_id == null"
                  :items="branches"
                  item-text="name"
                  item-value="id"
                  clearable
                  v-model="form.branch"
                  label="Branch"
              ></v-select>
            </div>
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
          v-if="item.closed_at == null"
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          v-else
          small
          class="mr-2"
          @click="viewItem(item)"
        >
          mdi-eye
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
import filter from '@/mixins/filter.js'
  export default {
    mixins:[filter],
    data(){
      
      
      return {
        title : "Inventory documents",
        filters : ['global/getBranches'],
        options: {},
        form : {
          closed : null,
          branch : null
        },

        types : [{text : 'closed' , value : 0 },{text : 'opened' , value : 1 } ]
      }
    },
    computed: {
      ...mapGetters({
        datatable: 'inventory/documentsDatatable',
        branches: 'global/branches',
        isLoading: 'inventory/documentsLoading',
        createLoading: 'inventory/createLoading',

      }),
    },
    methods: {
      getData(form) {
        // const payload = {...this.payload, ...this.filters}
        this.$store.dispatch('inventory/get' , form)
      },
      editItem(item) {
        this.$router.push({name : "inventory-edit" , query : {doc : item.id}})
      },
      viewItem(item) {
        this.$router.push({name : "inventory-edit" , query : {doc : item.id , view:'1'}})
      },
      deleteItem(item) {
        this.$store.commit('ui/setDeleteModal' , true)
        this.$store.commit('global/setDeleteItem' , {id:item.id , table : 'inventories'} )
        this.$store.commit('global/setDeleteAction' , {action:'inventory/get' , payload : this.filters})
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
      },
      
    },
  }
</script>

<style lang="scss" scoped>
@media(max-width : 600px){
  tr td:first-child{
    background-color: $color-primary;
  }
}
</style>