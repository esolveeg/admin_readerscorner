<template>
  <v-card class=''>
    <v-data-table
    :headers="datatable.headers"
    :items="datatable.data"
    :options.sync="options"
    :server-items-length="datatable.total"
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
                  @click.prevent="create"
                >
                  New Item
              </v-btn>
          <!-- <modals-products-create/> -->
        </v-toolbar>
      </div>
      <div class="spacing-playground pa-6 mb-6">
        <v-row>
          <v-col cols="3">
            <v-select
                :items="languages"
                v-model="form.language"
                clearable
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
                v-model="form.category"
                clearable
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
                v-model="form.age"
                clearable
                attach
                label="ages"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
                :items="imageFilter"
                v-model="form.image"
                clearable
                item-text="title"
                item-value="value"
                label="has image"
            ></v-select>
          </v-col>
         
          <v-col cols="8">
            <v-text-field
              v-model="form.search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-btn color="primary" class="capitalize w-full" @click.prevent="saveFilters()">
              remember my choices
            </v-btn>
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
import filter from "@/mixins/filter.js"
import crudActions from "@/mixins/crudActions.js"
  export default {
    mixins : [filter , crudActions],
    data: () => ({
      dialog: false,
      title : "prodcuts",
      options: {},
      docType : 5,
      docOptions:{action: 'document/create' ,route: 'products-documents-edit-id'},
      imageFilter : [
        {title : 'no image' , value : 0},
        {title : 'with image' , value : 1},
      ],
      filters : [
        'global/getLanguages',
        'global/getCategories',
        'global/getAges',
      ],
      form: {
        language : null,
        image : null,
        page : null,
        show : null,
        age : null,
        category : null,
        subcategory : null, 
        search : null,
      },
    }),
    computed: {
      ...mapGetters({
        datatable: 'product/datatable',
        ages: 'global/ages',
        categories: 'global/categories',
        languages: 'global/languages',
      }),
    },
    methods: {
      getData(form) {
        this.$store.dispatch('product/get' , form)
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
  }
</script>

<style lang="scss" scoped>
@media(max-width : 600px){
  tr td:first-child{
    background-color: $color-primary;
  }
}
</style>