
<template>
    <v-row>
      <v-col class="text-center" v-if="!$route.query.view"  cols="12" lg="6">
        <v-card class="pa-4">
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
            <v-row>
              <v-col class="text-center mb-8" cols="8">
                <v-text-field
                  v-model="form.product"
                  :counter="10"
                  :rules="rules.product"
                  :loading="productLoading"
                  :messages="productErr"
                  ref="product"
                  @keyup.enter="findProduct"
                  label="ISBN"
                  required
                ></v-text-field>
              </v-col>
              <v-col class="text-center" cols="4">
                <v-text-field
                  v-model="form.qty"
                  ref="qty"
                  :rules="rules.qty"
                  @keyup.enter="addItem"
                  label="Quantity"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
              <v-btn
                color="success block w-full d-block"
                class="mr-4"
                @click="addItem"
              >
                Submit
              </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col class="text-center d-none d-lg-block" cols="6" v-if="!$route.query.view">
        <v-card class="pa-4">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Isbn
                    </th>
                    <th class="text-left">
                      Title
                    </th>
                    <th class="text-left">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="item">
                    <td class="text-left">{{ item.isbn }}</td>
                    <td class="text-left">{{ item.title }}</td>
                    <td class="text-left">{{ item.price }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
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
    </v-row>
</template>
<script>
import editDocument from "@/mixins/editDocument.js"
export default {
  data(){
    return {
      form: {
        product : '',
        qty : 1,
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
  mixins :[editDocument],
}
</script>