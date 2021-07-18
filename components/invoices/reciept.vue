<template>

    <v-card class="invoice-box p-4" :dark="false">
      <div class="top flex-center mt-6">
        <div class="logo">
            <img style="width:150px" src="http://readerscorner.co/_nuxt/img/logo.9376d50.png">
        </div>
        <div class="meta text-left">
          <div class="d-block"> Invoice #: {{doc.id}}</div>
          <div class="d-block"> Created #: {{doc.created_at}}</div>
          <div class="d-block"> closed #: {{doc.closed_at}}</div>
        </div>
        
      </div>
      <div class="middle flex-center mb-4">
        <div class="text-left">
          <div class="d-block"> website : http://readerscorner.co</div>
          <div class="d-block">email : info@readerscorner.co</div>
        </div>
        <div class="right">
          <div class="d-block">employee : {{doc.created_by}}</div>
          <!-- <div class="d-block">payment : {{doc.payment}}</div> -->
        </div>
      </div>
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr class="text-center">
              <th class="text-center">{{$route.params.type}}</th>
              <!-- <th class="text-center">isbn</th> -->
              <th v-if="$route.params.type != '6'" class="text-center">Unit Cost</th>
              <th class="text-center">Qty</th>
              <th v-if="$route.params.type != '6'" class="text-center">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,index) in doc.products" :key="index"
              class="text-center"
            >
              <td>{{item.title}}</td>
              <!-- <td>{{item.isbn}}</td> -->
              <td v-if="$route.params.type != '6'">EGP{{item.price}}</td>
              <td>{{item.qty}}</td>
              <td v-if="$route.params.type != '6'">EGP{{ item.price * item.qty }}</td>
              
            </tr>
             <tr
              class="text-center totals"
            >
              <!-- <td class="no-border" colspan="3"></td> -->
              <td colspan="4"  v-if="$route.params.type != '6'">
                <div class="flex-center">
                  <h2>Subtotal:</h2> <h3>EGP{{doc.subtotal}}</h3>
                </div>
              </td>
            </tr>
            <tr
              class="text-center totals"
              v-if="doc.discount_percent"
            >
              <td colspan="4"  v-if="$route.params.type != '6'">
                <div class="flex-center">
                  <h2>Discount({{doc.discount_percent}}):</h2> <h3>EGP{{doc.discount_value}}</h3>
                </div>
              </td>
            </tr>
            <tr
              class="text-left totals"
              v-if="doc.discount_percent"
            >
            <td colspan="4"  v-if="$route.params.type != '6'">
                <div class="flex-center">
                <h2>Total:</h2> <h3>EGP{{doc.total}}</h3>
                </div>
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
        doc: 'document/docWithItems',
        loading: 'document/docLoading',
        
      }), 
      total() {
      return this.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    }
    },
     data(){
         return {
            items: [
                { description: "Website design", quantity: 1, price: 300 },
                { description: "Website design", quantity: 1, price: 75 },
                { description: "Website design", quantity: 1, price: 10 }
            ]           
         }
     } ,
}
</script>
<style>
.invoice-box{
  margin: 0 auto;
  max-width: 500px;
}
 .flex-center{
   display: flex;
   align-items: center;
   justify-content: space-between;
 }
 .p-4{
   padding: 30px;
 }
 .mb-4{
   margin-bottom: 20px;
 }
 .no-border{
   border-bottom: 0;
 }
.text-right{
  text-align: right;
}

.text-left{
  text-align: left;
}
</style>