<template>
  <div>
      <builders-form :opts="opts"/>
  </div>
</template>
<script>
import FormBuilder from "@/builders/form.js"
import FormDirector from "@/builders/formDirector.js"
  export default {
    data(){
      const opts = {
        cols : '12',
        title : 'test',
        hiddenable : true,
        inputs : [
          {
            type : "text",
            prop : "name",
            ref : "name",
            enter : ()=>{console.log('enter')},
            label : 'name',
            rules : [],
            
          }
        ],

      }
      return {
        opts
      }
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