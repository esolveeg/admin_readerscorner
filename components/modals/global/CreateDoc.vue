
<template>
<v-dialog
    v-model="createDocModal"
    max-width="500px"
    >
            
            <builders-form :opts="opts"/>
          </v-dialog>
</template>

<script>
import FormBuilder from "@/builders/form.js"
import FormDirector from "@/builders/formDirector.js"
export default {
   layout:"auth",
   props:{
     type : {
       default : null,
       type : Number
     }
   },
   data(){
     const opts = new FormDirector(
                  new FormBuilder())
                  .makeEditAddDoc(this)
      return {
        opts
      }
    },
    computed: {
      createDocModal:
      {
          get()
          {
              return this.$store.state.ui.createDocModal
          },
          set(value)
          {
            this.$store.commit('ui/createDocModal' , value)
          }
      },
      
    },

    methods:{
        close(){
            this.$store.commit('ui/setCreateModal' , false)
        },
        getBranches(){
          this.$store.dispatch("global/getBranches");
        },
        create(){
          this.$store.dispatch("inventory/create" , this.form)
          .then(res => {
            this.$router.push({path : "inventory/edit" , query : {doc : res.id}})
            this.close()
          })
        }
    },
    created(){
      this.getBranches()
    }
}
</script>