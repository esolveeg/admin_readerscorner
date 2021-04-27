<template>
  <v-card class=''>
    <v-data-table
    :headers="datatable.headers"
    :items="datatable.data"
    :server-items-length="datatable.total"
    :options.sync="options"
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
          <v-btn @click.prevent="$router.push({name : 'documents-edit' , query : {doc : 2}})">new order</v-btn>
          <!-- <modals-products-create/> -->
        </v-toolbar>
      </div>
      <div class="spacing-playground pa-6 mb-6">
        <v-row>
          <v-col cols="3">
              <v-select
                  :items="status"
                  v-model="form.status"
                  label="status"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-select
                  :items="gateways"
                  label="gateway"
                  v-model="form.gateway"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-select
                  :items="types"
                  v-model="form.closed"
                  label="gateway"
              ></v-select>
            </v-col>
        </v-row>

      </div>

    </template>
    <template v-slot:[`item.status`]="{ item }">
      <span v-if="!editStatus.includes(item.id)" @dblclick="editStatus.push(item.id)" class="pointer">{{item.status}}</span>
      <v-select
          v-else
          :items="status"
          :loading="statusLoading"
          @change="updateStatus($event , item.id)"
          :value="item.status"
          label="Status"
          class="dt-select"
          dark
          solo
        ></v-select>
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
import filter from '@/mixins/filter.js'
import { removeFromArrayByVal } from '@/common/Helpers.js'
  export default {
    mixins : [filter],
    data: () => ({
      title : "orders",
      editStatus: [],
      status:['pending' , 'shipping' , 'shipped'],
      gateways:['cod' , 'card'],
      options: {},
      types : [{text : 'cart' , value : 0 },{text : 'orders' , value : 1 } ],
      form:{
        gateway : null,
        status : null,
        closed : null,
      },
    }),
    computed: {
      ...mapGetters({
        datatable: 'order/datatable',
        statusLoading: 'order/statusLoading'
      }),
    },
    methods: {
      getData(form) {
        console.log(form)
        
        this.$store.dispatch('order/get' , form)
      },
      updateStatus(status , id){
        const payload = {
          status ,
          id
        }
        this.$store.dispatch('order/updateStatus' , payload)
        .then(() => {
          this.editStatus = removeFromArrayByVal(id , this.editStatus)
        })
      }
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