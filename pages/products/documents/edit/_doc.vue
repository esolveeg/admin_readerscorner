<template>
  <div>
      <builders-data-table :opts="opts"/>
  </div>
</template>
<script>
import DatatableBuilder from "@/builders/datatable.js"
import DatatableDirector from "@/builders/datatableDirector.js"
  export default {
    data(){
      const opts = new DatatableDirector(
                  new DatatableBuilder())
                  .makeDocumentItems()
      return {
        opts
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