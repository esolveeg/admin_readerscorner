<template>
     <v-form>
        <v-row>
            <v-col
            cols="12"
            >
            <v-select
                :items="branches"
                item-text="name"
                item-value="id"
                label="Branch"
            ></v-select>
            </v-col>
        </v-row>
        </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data(){
      return {
        form: {
            branch : null
        }
      }
    },
    computed: {
      ...mapGetters({
        branches: 'global/branches'
      }),
    },
    methods:{
        getBranches(){
          this.$store.dispatch("global/getBranches");
        },
    },
    created(){
      this.getBranches()
    }
}
</script>