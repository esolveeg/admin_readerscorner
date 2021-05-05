<template>
 <v-card class="pa-4">
    <v-card-title class="primary mb-4 d-flex justify-between">
      <!-- {{errors}} -->
      <h2>Fill the product information down below</h2>
      <v-spacer/>
      <v-switch v-model="metaHidden" color="white" label="hide uneccessary fields"></v-switch>
    </v-card-title>
    <v-card-text>   
      <v-form
        ref="productForm"
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
                  cache-items
                  :return-object="false"
                  label="author"
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
              <v-btn @click.prevent="saveCategories">save my choices</v-btn>
            </v-col>
            
          </v-row>
        </v-row>
        <v-btn
          color="success"
          class="mr-4  w-full block mt-8"
          :disabled="!valid"
          @click.prevent="createProduct"
        >
          Submit
        </v-btn>
        <modals-authors-create @created="authorCreated"/>
      </v-form>   
      </v-card-text>
    </v-card> 
</template>


<script>
import createProduct from "@/mixins/createProduct.js"

  export default {
    mixins : [createProduct],
}
</script>