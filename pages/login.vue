<template>
    <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <div class="danger" v-if="error">
                            <span >{{error}}</span>
                        </div>
                        <!-- <div v-if="errors && typeof errors == 'array'">
                            <span v-for="(error , index) in errors" :key="index">{{error}}</span>
                        </div> -->
                        <v-form v-model="valid" ref="loginForm">
                           <v-text-field
                              prepend-icon="mdi-account-arrow-right"
                              :rules="rules.email"
                              v-model="form.email"
                              label="Email"
                              type="email"
                              :error="errors.hasOwnProperty('email')"
                              :error-messages="errors.email"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              :rules="rules.password"
                              prepend-icon="mdi-lock"
                              v-model="form.password"
                              label="Password"
                              type="password"
                              :error="errors.hasOwnProperty('password')"
                              :error-messages="errors.password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" class="d-block w-full" :loading="loading"  @click.prevent="login">Login</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
   layout:"auth",
   data(){
      return {
         valid:false,
         rules:{
               password: [
                  v => !!v || 'password is required',
                  v => v.length >= 6 || 'password must be more than than 6 characters',
               ],
               email: [
                  v => !!v || 'E-mail is required',
                  v => /.+@.+/.test(v) || 'E-mail must be valid',
               ],
         },
         
         form:{
               email : 'admin@readerscorner.co',
               password : '123456',
         },
      }
    },
    computed: {
      ...mapGetters({
        loading: 'myAuth/loading',
        errors: 'myAuth/errors',
        error: 'myAuth/error'
      }),
    },
    methods:{
      login(){
          if(!this.loading){
          this.$refs.loginForm.validate();
          if(this.valid){
            this.$store.dispatch('myAuth/login' , {"auth" : this.$auth ,'form' :this.form})
            .then(() => {
               console.log('asd')
            })
          }
      }
    }
    }
};
</script>
