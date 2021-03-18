<template>
  <v-card class=''>
    <v-data-table
    :headers="datatable.headers"
    :items="datatable.data"
    :options.sync="options"
    :server-items-length="datatable.total"
    :loading="datatable.loading"
    sort-by="calories"
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
          <!-- <modals-products-create/> -->
        </v-toolbar>
      </div>
      <div class="spacing-playground pa-6 mb-6">
        <v-row>
          <v-col cols="3">
            <v-select
                :items="languages"
                item-text="title"
                item-value="id"
                label="language"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
                :items="categories"
                item-text="title"
                item-value="slug"
                multiple
                chips
                attach
                label="categories"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
                :items="ages"
                item-text="title"
                item-value="slug"
                multiple
                chips
                attach
                label="ages"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-switch
            v-model="payload.image"
            inset
            label="Image"
            ></v-switch>
          </v-col>
         
          <v-col cols="12">
            <v-text-field
              v-model="datatable.search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

      </div>

    </template>
    <template v-slot:[`item.thumbnail`]="{ item }">
      <v-img v-if="item.thumbnail !== 'no-image'" :src="item.thumbnail" class="dt-image"/>
      <v-img v-else src="https://res.cloudinary.com/dwfcmvqn5/image/upload/v1550827381/no-img.jpg" class="dt-image"/>
     
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
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      title : "prodcuts",
      options: {},
      languages:[{title : "none" , id : null}],
      categories:[],
      ages:[],
      payload:{
        show : 10,
        page: 1,
      },
      filters:{
        language: null,
        image:null,
        category:null,
        subcategory:null,
      }
    }),
    watch: {
      options: {
        handler () {
          this.payload.show = this.options.itemsPerPage
          this.payload.page = this.options.page
          this.getProducts()
        },
        deep: true,
      },
    },
    computed: {
      ...mapGetters({
        datatable: 'product/datatable',
        // languages: 'global/languages',
      }),
    },
    methods: {
      getProducts() {
        this.$store.dispatch('product/get' , this.payload)
      },
      editItem (item) {
        console.log(item)
      },

      deleteItem (item) {
       console.log(item)
      },

      deleteItemConfirm () {
       console.log('cinfirmed')
      },
    },
    created(){
      this.$store.dispatch('global/getLanguages')
      .then(res => {
        this.languages = [...this.languages, ...res]
      })
      this.$store.dispatch('global/getCategories')
      .then(res => {
        this.categories = [...this.categories, ...res]
      })
      this.$store.dispatch('global/getAges')
      .then(res => {
        this.ages = [...this.ages, ...res]
      })
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