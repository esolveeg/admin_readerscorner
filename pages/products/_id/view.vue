
<template>
  <v-card>
      <v-list two-line>
      <v-list-item-group>
        <template v-for="(item, index) in props">
          <v-list-item :key="item.title">
            <template v-if="product[item.prop] == null" v-slot:default="{ }">
              <v-list-item-content>
                <v-list-item-title  class="mb-4">
                  {{item.title}}
                </v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                >
                  no data
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>
            <template v-else v-slot:default="{ }">
              <v-list-item-content v-if="item.type == 'text'">
                <v-list-item-title  class="mb-4">
                  {{item.title}}
                </v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                  v-text="product[item.prop]"
                ></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content v-if="item.type == 'bool'">
                <v-list-item-title  class="mb-4">
                  {{item.title}}
                </v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                >
                  {{product[item.prop] == 1 ? `true` : `false`}}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content v-if="item.type == 'img'">
                <v-list-item-title  class="mb-4">
                  {{item.title}}
                </v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                >
                  <v-img class="w-200" :src="product[item.prop]"/>
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < props.length - 1"
            :key="index"
          ></v-divider>
        </template>
        <template>
          <v-list-item>
            <template v-slot:default="{ }">
              <v-list-item-content>
                <v-list-item-title v-text="'Stock'" class="mb-4"></v-list-item-title>

                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left" v-for="(item,index) in product.stock" :key="index">
                          {{item.branch}}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td v-for="(item , index) in product.stock" :key="index">{{ item.qty }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < props.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex"
 export default {
     computed:{
         ...mapGetters({
             loading : "product/findLoading",
             product : "product/product",
         })
     },
     created(){
         this.$store.dispatch('product/find' , this.$route.params.id)
     },
    data: () => ({
      selected: [2],
      props : [
          {prop: "title" , title : 'title' , type : 'text'},
          {prop: "isbn" , title : 'isbn' , type : 'text'},
          {prop: "price" , title : 'price' , type : 'text'},
          {prop: "thumbnail" , title : 'thumbnail' , type : 'img'},
          {prop: "image" , title : 'image' , type : 'img'},
          {prop: "description" , title : 'description' , type : 'text'},
          {prop: "author" , title : 'author' , type : 'text'},
          {prop: "language" , title : 'language' , type : 'text'},
          {prop: "website" , title : 'website' , type : 'bool'},
          {prop: "created_at" , title : 'created_at' , type : 'text'},
      ],
    }),
  }
</script>