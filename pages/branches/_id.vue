
<template>
    <v-row>
      <v-col class="text-center"  cols="12" >
        <v-card class="pa-4">
          <builders-form :opts="formOpts" ></builders-form>
        </v-card>
      </v-col>
    </v-row>
</template>
<script>
import FormBuilder from "@/builders/form.js"
import FormDirector from "@/builders/formDirector.js"

export default {
  mounted(){
    console.log(this.$route.name)
  },
  data(){
       const formOpts = new FormDirector(
                  new FormBuilder())
                  .makeEditAddBranch()
    return {
      formOpts,
    }
  },
}
</script>