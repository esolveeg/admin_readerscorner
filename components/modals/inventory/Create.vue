<template>
<v-dialog
    v-model="active"
    max-width="500px"
    >
            
            <v-card>
              <v-card-title>
                <span class="headline">{{formTitle}}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                 <v-form>
                  <v-row>
                      <v-col
                      cols="12"
                      >
                      <v-select
                          :items="branches"
                          item-text="name"
                          item-value="id"
                          v-model="form.branch"
                          label="Branch"
                      ></v-select>
                      </v-col>
                  </v-row>
                </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="create"
                >
                  Continue
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
</template>

<script>
// import {addParamsToLocation} from "@/common/helpers.js"
import { mapGetters } from 'vuex'
  export default {
    data(){
      return {
        formTitle: "Please select the branch",
        form: {
          branch : null
        }
      }
    },
    computed: {
      active:
      {
          get()
          {
              return this.$store.state.ui.createModal
          },
          set(value)
          {
            this.$store.commit('ui/setCreateModal' , value)
          }
      },
      ...mapGetters({
        branches: 'global/branches'
      }),
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