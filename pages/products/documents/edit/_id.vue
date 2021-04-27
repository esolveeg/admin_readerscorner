
<template>
    <v-row>
      <v-col class="text-center" v-if="!$route.query.view"  cols="12">
        <v-card class="pa-4">
          <v-card-title class="primary mb-4 d-flex justify-between">
            <!-- {{errors}} -->
            <h2>Fill the product information down below</h2>
            <v-spacer/>
            <v-switch v-model="metaHidden" color="white" label="hide uneccessary fields"></v-switch>
          </v-card-title>
          <v-card-text>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
              <v-row>
                  
                <v-col class="text-center mb-8" cols="6">
                  <v-text-field
                    :error="errors.hasOwnProperty('isbn')"
                    :error-messages="errors.isbn"
                    v-model="productForm.isbn"
                    :rules="productRules.isbn"
                    :loading="productLoading"
                    :messages="productErr"
                    ref="isbn"
                    @keyup.enter="$refs.slug.focus()"
                    label="ISBN"
                  ></v-text-field>
                </v-col>
                <v-col class="text-center mb-8" cols="6">
                  <v-text-field
                    v-model="productForm.title"
                    :rules="productRules.title"
                    :error="errors.hasOwnProperty('title')"
                    :error-messages="errors.title"
                    :loading="productLoading"
                    :messages="productErr"
                    ref="title"
                    @keyup.enter="$refs.slug.focus()"
                    label="title"
                  ></v-text-field>
                </v-col>
                <v-col class="text-center mb-8" cols="6">
                  <v-text-field
                    v-model="productForm.slug"  
                    :rules="productRules.slug"
                    :error="errors.hasOwnProperty('slug')"
                    :error-messages="errors.slug"
                    :loading="productLoading"
                    :messages="productErr"
                    ref="slug"
                    @keyup.enter="$refs.price.focus()"
                    label="slug"
                  ></v-text-field>
                </v-col>
                <v-col class="text-center" cols="6">
                  <v-text-field
                    v-model="productForm.price"
                    ref="price"
                    :error="errors.hasOwnProperty('price')"
                    :error-messages="errors.price"
                    :rules="productRules.price"
                    @keyup.enter="$refs.old_price.focus()"
                    label="price"
                  ></v-text-field>
                </v-col>
                <!-- product_id
                      title
                      slug
                      thumbnail
                      image
                      isbn
                      description
                      author_id
                      language_id
                      age_id
                      price
                      old_price
                      website -->
                      <!-- //uneccessary fields -->
                <v-row v-show="!metaHidden">
                  <v-col class="text-center" cols="6">
                    <v-select
                      :items="languages"
                      v-model="productForm.language_id"
                      :rules="productRules.languages"
                      :error="errors.hasOwnProperty('language_id')"
                      :error-messages="errors.language_id"
                      clearable
                      item-text="title"
                      item-value="id"
                      label="language"
                    ></v-select>
                  </v-col>
                  <v-col class="text-center" cols="6">
                    <v-select
                      :items="ages"
                      v-model="productForm.age_id"
                      :rules="productRules.age"
                      :error="errors.hasOwnProperty('age_id')"
                      :error-messages="errors.age_id"
                      clearable
                      item-text="title"
                      item-value="id"
                      label="age"
                    ></v-select>
                  </v-col>
                  
                  <v-col class="text-center" cols="12">
                    <v-textarea
                      v-model="productForm.description"
                      label="description"
                      :error="errors.hasOwnProperty('description')"
                      :error-messages="errors.description"
                      auto-grow
                      rows="3"
                    ></v-textarea>
                  </v-col>
                  <v-col class="text-center mb-8" cols="6">
                    <v-text-field
                      v-model="productForm.thumbnail"
                      :error="errors.hasOwnProperty('thumbnail')"
                      :error-messages="errors.thumbnail"
                      :rules="productRules.thumbnail"
                      :loading="productLoading"
                      :messages="productErr"
                      ref="thumbnail"
                      @keyup.enter="$refs.price.focus()"
                      label="thumbnail"
                    ></v-text-field>
                  </v-col>
                  <v-col class="text-center mb-8" cols="6">
                    <div>
                      <v-text-field
                        v-model="productForm.image"
                        :error="errors.hasOwnProperty('image')"
                        :error-messages="errors.image"
                        :rules="productRules.image"
                        :loading="productLoading"
                        :messages="productErr"
                        ref="image"
                        @keyup.enter="$refs.price.focus()"
                        label="image"
                      ></v-text-field>
                    </div>
                  </v-col>
                  <v-col class="text-left" cols="6">
                    <div class="d-flex">
                      <v-combobox
                        :items="authors"
                        v-model="productForm.author_id"
                        :error="errors.hasOwnProperty('author_id')"
                        :error-messages="errors.author_id"
                        :rules="productRules.author"
                        item-text="name"
                        item-value="id"
                        :return-object="false"
                        label=""
                      ></v-combobox>
                      <v-icon @click.prevent="createAuthor" >mdi-plus</v-icon>
                    </div>
                  </v-col>
                  <v-col class="text-center" cols="6">
                    <v-switch
                      name="input-7-1"
                      label="website product"
                      auto-grow
                      v-model="productForm.website"
                    ></v-switch>
                  </v-col>
                  <v-col class="text-left" cols="12">
                    <v-treeview
                      selectable
                      v-model="productForm.categories"
                      selection-type="independent"
                      item-text="title"
                      item-key="id"
                      :items="categories"
                    ></v-treeview>
                  </v-col>
                  
                </v-row>
              </v-row>
                <v-btn
                  color="success w-full block mt-8"
                  class="mr-4"
                  @click.prevent="createProduct"
                >
                  Submit
                </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="text-center" cols="12">
        <datatables-inventory-items/>
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
      <modals-authors-create @created="authorCreated"/>
    </v-row>
</template>
<script>
import editDocument from "@/mixins/editDocument.js"
import {mapGetters} from "vuex"
export default {
  // "title" => "required|max:255",
  // "slug" => "required|max:255|unique:products",
  // "thumbnail" => "nullable",
  // "image" => "nullable",
  // "isbn" => "required|max:255|unique:products",
  // "description" => "nullable|max:255",
  // "author_id" => "nullable|max:255",
  // "language_id" => "nullable|max:255",
  // "age_id" => "nullable|max:255",
  // "price" => "required",
  // "old_price" => "nullable",
  // "website" => "nullable",

  computed: {
    ...mapGetters({
      ages: 'global/ages',
      errors: 'product/createError',
      authors: 'global/authors',
      categories: 'global/categories',
      languages: 'global/languages',
    }),
  },
  data(){
    return {
      form: {
        product : '',
        qty : 0,
      },
      metLocalStorageKey : "create_product_meta_hidden",
      metaHidden : false,
      actions : ['global/getLanguages',
        'global/getCategories',
        'global/getAuthros',
        'global/getAges',],
      productForm : {
        title : null,
        thumbnail : null,
        image : null,
        slug : null,
        isbn : null,
        description : null,
        price : null,
        categories : [],
        author_id : null,
        language_id : null,
        age_id : null,
        old_price : null,
        website : false,
      },
      productRules : {
        title : [
          v => !!v || 'title is required',
          // v => v.length > 255 || 'title must be less than 255 character',
        ],
        thumbnail : [],
        image : [],
        slug : [
          v => !!v || 'slug is required',
          // v => v.length > 255 || 'slug must be less than 255 character',

        ],
        isbn : [
          v => !!v || 'isbn is required',
          // v => v.length > 255 || 'isbn must be less than 255 character',
        ],
        description : [
          v => v.length > 255 || 'description must be less than 255 character',
          // v => !!v || 'description is required',
        ],
        price : [
          v => !!v || 'price is required',
          v => (v && !isNaN(v)) || 'this field must be a valid price',
        ],
        author_id : [],
        language_id : [],
        age_id : [],
        old_price : [],
        website : [],
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
  watch:{
     metaHidden: {
          handler () {
            localStorage.setItem(this.metLocalStorageKey , this.metaHidden)
          },
          deep: true,
        },
  },
  methods :{
    createProduct(){
      this.$store.dispatch('product/create' , this.productForm)
      .then(res => {
        console.log(res)
        this.form.product = res.id
        this.addItem()

      })
    },
    authorCreated(res){
      console.log(res)
      this.productForm.author_id = res.id
    },
    createAuthor(){
      this.$store.commit('ui/authorModal' , true)
      console.log('create')
    }
  },
  created(){
    this.actions.forEach(action => {
          this.$store.dispatch(`${action}`)
        })
          this.$store.dispatch(`global/getAuthors`)

    //set the meta hidden value which responsible for hiding the unecessary fields on the product 
    // to its previous value selected on this browser
    let metaHidden = localStorage.getItem(this.metLocalStorageKey)
    if( typeof metaHidden !== 'undefined'){
      // parsing string value from locale storage to boolean
      metaHidden = metaHidden === 'true'
      this.metaHidden = metaHidden
    }
    console.log(metaHidden)
  },
  mixins :[editDocument],
}
</script>