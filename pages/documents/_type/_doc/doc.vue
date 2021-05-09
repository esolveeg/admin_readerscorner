
<template>
    <v-row>
      <v-col cols="12" v-if="closeErr">
        <div class="danger">
          {{closeErr}}
        </div>
      </v-col>
        <!-- //check if doc type is inventory or define or first balance  or return  -->
      <v-col cols="12" v-if="($route.params.type >= 4 && $route.params.type <= 7) || ($route.params.type == 1 || $route.params.type == 3)">
        <v-card class="pa-4">
          <builders-form :opts="formOpts" ></builders-form>
        </v-card>
      </v-col>
      <v-row v-else>
        <v-col class="text-center"  cols="6" >
          <v-card class="pa-4">
            <builders-form :opts="formOpts" ></builders-form>
          </v-card>
        </v-col>
        <v-col class="text-center"  cols="6" >
          <v-card class="pa-4">
            <builders-form :opts="configFormOpts" ></builders-form>
          </v-card>
        </v-col>
      </v-row>
        <!-- //check if doc type is inventory or define or first balance    -->
      <v-col cols="12" v-if="($route.params.type >= 4 && $route.params.type <= 7) || ($route.params.type == 1 || $route.params.type == 3)">
        <builders-data-table :opts="dataTableOpts"/>
      </v-col>
      <v-row v-else>
        <v-col class="text-center" cols="8">
          <builders-data-table :opts="dataTableOpts"/>
        </v-col>
        <v-col class="text-center" >
          <invoices-totals/>
        </v-col>
      </v-row>
      <!-- <v-col class="text-center" :dark="false" cols="12">
        <invoices-main/>
        <invoices-reciept/>
      </v-col> -->

       <v-col class="text-center" cols="12">
        <v-btn class="block success w-full" @click.prevent="closeDoc">
          Close
        </v-btn>
        <modals-global-close-doc/>
      </v-col>
      <div id="invoice" v-if="printing" ref="invoice">
        <invoices-reciept/>
      </div>
      <v-btn @click="ptint()">print</v-btn>
    </v-row>
</template>
<script>
import FormBuilder from "@/builders/form.js"
import FormDirector from "@/builders/formDirector.js"
import DatatableBuilder from "@/builders/datatable.js"
import DatatableDirector from "@/builders/datatableDirector.js"

export default {
  mounted(){
    console.log(this.$route.name)
  },
  data(){
      const dataTableOpts = new DatatableDirector(
          new DatatableBuilder()
      ).makeDocumentItems(this)
      const formOpts = new FormDirector(
        new FormBuilder())
        .makeEditAddDocItem()
        const configFormOpts = new FormDirector(
                  new FormBuilder())
                  .makeEditAddDoc(this)
      
    return {
      valid:false,
      formOpts,
      printing: false,
      closeErr:"",
      dataTableOpts,
      configFormOpts,
    }
  },
  methods:{
    closeDoc(){
        // this.print()

      this.$store.dispatch('document/close' , this.$route.params.doc)
      .then(res => {
        console.log(res)
        this.$router.push({name : "documents-type", params: {type : this.$route.params.type}})
      })
      .catch(err => {
        this.closeErr = err.response.data
        window.scrollTo({ top:0, behavior: 'smooth'});

      })
    },
    print(){
      this.printing = true
      // Get HTML to print from element
      const prtHtml = document.getElementById('invoice').innerHTML;

      // Get all stylesheets HTML
      let stylesHtml = '';
      for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
        stylesHtml += node.outerHTML;
      }

      // Open the print window
      const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

      WinPrint.document.write(`<!DOCTYPE html>
      <html>
        <head>
          ${stylesHtml}
        </head>
        <body>
          ${prtHtml}
        </body>
      </html>`);

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    },
    findProduct(){
      this.$store.dispatch('global/getProduct' , this.form.product)
      .then(res => {
        this.productErr = ""
        this.item = res
        this.$refs.qty.focus()
      })
      .catch(() => {
        this.productErr = "this product not found"
      })
    },
    reset () {
      this.$refs.form.reset()
    },
  },
}
</script>