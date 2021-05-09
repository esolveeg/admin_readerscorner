<template>
    <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <builders-form :opts="opts" @submitted="submitted"/>
               </v-flex>
            </v-layout>
         </v-container>
</template>

<script>
import FormBuilder from "@/builders/form.js"
import FormDirector from "@/builders/formDirector.js"
export default {
   layout:"auth",
   data(){
     const opts = new FormDirector(
                  new FormBuilder())
                  .makeLogin()
      return {
        opts
      }
    },
    methods :{
      submitted(form){
        setTimeout(() => {
          this.opts.loading = false
          
        }, 3000);
        console.log(form)
      }
    },
    
};
</script>
