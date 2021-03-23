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
            <div class="d-flex pt-12 pb-12 items-center mr-8">
              <v-switch
              v-model="filters.closed"
              inset
              false-value="0"
              true-value="1"
              class="mr-8 mt-2"
              label="Closed"
              ></v-switch>
              <v-select
                  v-if="$auth.user.branch_id == null"
                  :items="branches"
                  item-text="name"
                  item-value="id"
                  v-model="filters.branch"
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
  export default {
    data(){
      let filters ={
        closed : this.$route.query.closed,
        branch : this.$route.query.branch,
      }
      return {
        title : "Inventory documents",
        branches:[
          {
            name : 'none',
            id : null
          },
        ],
        filters,
      }
    },
    computed: {
      ...mapGetters({
        datatable: 'inventory/documentsDatatable',
        isLoading: 'inventory/documentsLoading',
        createLoading: 'inventory/createLoading',

      }),
    },
    watch:{
      filters: {
        handler () {
          this.addParamsToLocation(this.filters)
          .then(this.getData())
        },
        deep: true,
      },
    },
    methods: {
      addParamsToLocation(params) {
          return new Promise(resolve=> {
            history.pushState(
                {},
                null,
                this.$route.path +
                '?' +
                Object.keys(params)
                    .map(key => {
                    return (
                        encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
                    )
                    })
                    .join('&')
            )
            window.scrollTo({ top:0, behavior: 'smooth'});
            resolve(true)
          })
      },
      getData() {
        // const payload = {...this.payload, ...this.filters}
        this.filters.branch = this.$auth.user.branch_id ? this.$auth.user.branch_id : this.filters.branch
        this.$store.dispatch('inventory/get' , this.filters)
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
      getBranches(){
        this.$store.dispatch("global/getBranches")
        .then(res => {
          console.log(res);
          this.branches = [...this.branches , ...res]
        })
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
    created(){
      this.getData()
      this.getBranches()
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