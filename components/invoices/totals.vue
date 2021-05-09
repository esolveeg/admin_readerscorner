<template>
<v-card>
  <v-card-title>
    invoice totals
  </v-card-title>
    <v-simple-table>
    <template v-slot:default>
        <v-skeleton-loader type="table" v-if="loading"></v-skeleton-loader>
        
        <tbody v-else>
        <tr >
            <td class="text-left">
                Subtotal
            </td>
            <td class="text-left">
                {{doc.subtotal}}
            </td>
        </tr>
        <tr >
            <td class="text-left">
                discount({{doc.discount_percent}})
            </td>
            <td class="text-left">
                {{doc.discount_value}}
            </td>
        </tr>
        <tr >
            <td class="text-left">
                total
            </td>
            <td class="text-left">
                {{doc.total}}
            </td>
        </tr>
        </tbody>
    </template>
    </v-simple-table>
</v-card>
</template>
<script>
import {mapGetters} from "vuex"
  export default {
    computed: {
      ...mapGetters({
        doc: 'document/filterdDoc',
        loading: 'document/docLoading',
      }), 
    },

    created(){
        this.$store.dispatch('document/findDoc' , this.$route.params.doc)
    },
    data () {
      return {
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
      }
    },
  }
</script>