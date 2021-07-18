<template>
    <div >
        <invoices-main v-show="doc.branch_id <= 2" class="main" :doc="doc"/>
        <invoices-reciept v-show="doc.branch_id > 2" class="reciept" :doc="doc"/>
    </div>
</template>

<script>
import {mapGetters} from "vuex"
  export default {
    computed: {
      ...mapGetters({
        doc: 'document/docWithItems',
        loading: 'document/docLoading',
        
      }), 
    },
}
</script>