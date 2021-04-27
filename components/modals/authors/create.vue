<template>
    <v-dialog v-model="active" max-width="500px">
        <v-card>
            <v-card-title class="headline">Craete author</v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="form.name" :rules="rules.name" label="name"/>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="form.author_slug" :rules="rules.slug" label="slug"/>
                        </v-col>
                        <v-col cols="12">
                            <v-switch v-model="form.top" lable="top"/>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn :loading="loading" class="d-block w-full" color="primary" @click.prevent="create()">create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
var slugify = require('slugify')

  export default {
      data(){
          return {
              valid : false,
              form : {
                  name : '',
                  author_slug : '',
                  top: false,
              },
              rules : {
                    name: [
                        v => !!v || 'name is required', 
                    ],
                    slug: [
                        v => !!v || 'slug is required', 
                    ],
                },
          }
      },
      watch:{
          form:{
              handler(newVal , oldVal){
                  oldVal.name !== newVal.name 
                  ? this.form.slug = slugify(newVal.name) 
                  : ''
              },
              deep: true
          },
          
      },
    computed: {
        ...mapGetters({
            loading : 'authors/createLoading'
        }),
        active:
        {
            get()
            {
                return this.$store.state.ui.authorModal
            },
            set(value)
            {
                this.$store.commit('ui/authorModal' , value)
            }
        },
    },

    methods:{
        close(){
            this.$store.commit('ui/authorModal' , false)
        },
        create(){
            this.$refs.form.validate()
            if(this.valid){
                this.$store.dispatch('author/create' , this.form)
                .then(res => {
                    this.$store.commit('ui/authorModal' , false)
                    this.$emit('created' , res)
                })

            }
        },
    }

  
}
</script>