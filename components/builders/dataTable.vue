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
                  class="mb-2"
                  :loading="datatable.createLoading"
                  @click.prevent="datatable.create"
                >
                  New Item
              </v-btn>
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
            <v-btn color="primary" class="capitalize w-full" @click.prevent="saveFilters()">
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
import datatable from "@/mixins/datatable.js"
  export default {
    mixins : [datatable],
  }
</script>

<style lang="scss" scoped>
@media(max-width : 600px){
  tr td:first-child{
    background-color: $color-primary;
  }
}
</style>