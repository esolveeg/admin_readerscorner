<template>
  <v-card class=''>
    <v-data-table
    :headers="opts.headers"
    :items="datatable.items"
    :options.sync="options"
    :server-items-length="datatable.total"
    :loading="loading"
    sort-by="created_at"
    class="elevation-1"
  >
    <template v-slot:top>
      <div class="">

        <v-toolbar
          flat
        >
          <v-toolbar-title>{{opts.title}}</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              dark
              class="mb-2 mr-2"
              v-if="opts.createable !== false"
              :loading="opts.createLoading"
              @click.prevent="create"
            >
            <v-icon >mdi-plus</v-icon>
              New Item
          </v-btn>
          <slot name="actions"></slot>
          <!-- <modals-products-create/> -->
        </v-toolbar>
      </div>
      <div class="spacing-playground pa-6 mb-6">
        <v-row>
          <v-col cols="3" v-for="(fil, index) in opts.filters" :key="index">
            <v-text-field v-model="form[fil.prop]" :clearable="fil.clearable" @keypress="isNumber($event)" @input="filter()" v-if="fil.type == 'number'" :label="fil.label" ></v-text-field>
            <v-select
                v-else-if="fil.type == 'select'"
                :items="fil.items"
                v-model="form[fil.prop]"
                :clearable="fil.clearable"
                :item-text="fil.itemText"
                :item-value="fil.itemValue"
                :label="fil.label"
            ></v-select>
             <v-menu
                v-else-if="fil.type == 'date'"
                :ref="fil.ref"
                clearable
                v-model="fil.menu"
                :close-on-content-click="true"
                :return-value.sync="fil.value"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form[fil.prop]"
                    :label="fil.label"
                    clearable
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form[fil.prop]"
                  clearable
                  no-title
                  scrollable
                >
                </v-date-picker>
              </v-menu>
              <!-- <builders-filter :filter="filter"/> -->
          </v-col>
          <v-col cols="8">
            <v-text-field
                v-model="form.search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-btn color="primary" v-if="opts.rememberAble != false" class="capitalize w-full" @click.prevent="saveFilters()">
              remember my choices
            </v-btn>
          </v-col>
        </v-row>

      </div>

    </template>
    <template v-slot:[`item.thumbnail`]="{ item }">
      <v-img v-if="item.thumbnail == '' && item.thumbnail !== 'no-image'" src="https://res.cloudinary.com/dwfcmvqn5/image/upload/v1550827381/no-img.jpg" class="dt-image"/>
      <v-img v-else :src="item.thumbnail" class="dt-image"/>
    </template>
    <template v-slot:[`item.image`]="{ item }">
      <v-img v-if="item.image == '' && item.image == 'no-image'" src="https://res.cloudinary.com/dwfcmvqn5/image/upload/v1550827381/no-img.jpg" class="dt-image"/>
      <v-img v-else :src="item.image" class="dt-image"/>
    </template>
    <template v-slot:[`item.qty`]="{ item }">
      <!-- <td v-if="!$slots.qty">{{item.qty}}</td> -->
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
      
        <v-btn v-if="opts.editable !== false && (typeof item.closed_at == 'undefined' || item.closed_at == null)" @click="editItem(item)" color="primary" class="mr-4">
          <v-icon
            small
            class="mr-2"
            
          >
            mdi-pencil
          </v-icon>
          Edit

        </v-btn>
        <v-btn v-if="opts.deleteble !== false  && (typeof item.closed_at == 'undefined' || item.closed_at == null)" @click="deleteItem(item)" color="danger" class="mr-4 mb-0">
          <v-icon
            small
          >
            mdi-delete
          </v-icon>
        </v-btn>
           <v-btn v-if="opts.viewable" @click="viewItem(item)"  class="mr-4 mb-0">
              <v-icon
                small
                class="mr-2"
              >
                mdi-eye
              </v-icon>
              View
            </v-btn>
        <slot name="itemActions" :item="item"></slot>

      
    </template>
    <template v-slot:no-data>
      <span>No data found</span>
    </template>
  </v-data-table>
  <modals-global-delete @deleted="getData"/>
         <modals-global-create-doc/>

  <slot name="modals"></slot>

  </v-card>
</template>
<script>
import datatable from "@/mixins/datatable.js"
  export default {
    mixins : [datatable],
    data(){
      return {
        edit: null,
        qty: null,
        qtyLoading : false,

      }
    },
    methods :{
      editQty(id , qty) {
        this.qty = qty
        this.edit  = id
        this.$refs[`qty-${id}`].focus()
      },
      updateQty(id){
        const payload = {
          qty :this.qty,
          id
        }
        this.$store.dispatch('document/updateQty' , payload)
        .then(() => {
          this.edit = null
          this.getData()
          this.$store.dispatch('document/findDoc' , this.$route.params.doc)

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