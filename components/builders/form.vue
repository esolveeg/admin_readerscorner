<template>
 <v-card class="pa-4">
    <v-card-title class="primary mb-4 d-flex justify-between">
      <!-- {{errors}} -->
      <h2>{{opts.title}}</h2>
      <v-spacer/>
      <v-switch v-if="opts.hiddenAble" v-model="metaHidden" color="white" label="hide uneccessary fields"></v-switch>
    </v-card-title>
    <v-card-text>   
      <v-form
        ref="form"
        v-model="opts.valid"
        lazy-validation
      >
        <v-row>
            <div class="danger w-full mt-4" v-if="opts.error">
                <span >{{opts.error}}</span>
            </div>
            <v-col v-for="(input,index) in opts.inputs" :key="index" class="text-center mb-8" :cols="input.cols">
                    <div class="text" v-if="input.type=='text'">
                        <v-text-field
                        :error="opts.errors.hasOwnProperty(input.prop)"
                        :error-messages="opts.errors[input.prop]"
                        v-model="form[input.prop]"
                        :type="input.inputType"
                        :rules="typeof input.rules == 'undefined' ?[] : input.rules"
                        :ref="input.ref"
                        :hint="input.hint"
                        @keyup.enter="enter(input)"
                        :label="input.label"
                        ></v-text-field>
                    </div>
                    <div class="select" v-if="input.type=='select'">
                        <v-select
                            :items="input.items"
                            v-model="form[input.prop]"
                            :rules="typeof input.rules == 'undefined' ?[] : input.rules"
                            :error="opts.errors.hasOwnProperty(input.prop)"
                            :error-messages="opts.errors[input.prop]"
                            :clearable="input.clearable"
                            :loading="input.loading"
                            :item-text="input.inputText"
                            :item-value="input.inputValue"
                            :label="input.label"
                        ></v-select>
                    </div>
                    <div class="textarea" v-if="input.type=='textarea'">
                        <v-textarea
                            :label="input.label"
                            v-model="form[input.prop]"
                            :rules="typeof input.rules == 'undefined' ?[] : input.rules"
                            :error="opts.errors.hasOwnProperty(input.prop)"
                            :error-messages="opts.errors[input.prop]"
                            auto-grow
                            :rows="input.rows"
                        ></v-textarea>
                    </div>
                    <div class="combobox" v-if="input.type=='combobox'">
                        
                        <v-combobox
                            :items="input.items"
                            v-model="form[input.prop]"
                            :rules="typeof input.rules == 'undefined' ?[] : input.rules"
                            :error="opts.errors.hasOwnProperty(input.prop)"
                            :loading="input.loading"
                            :error-messages="opts.errors[input.prop]"
                            :clearable="input.clearable"
                            :item-text="input.inputText"
                            :item-value="input.inputValue"
                            :return-object="false"
                            :label="input.label"
                            ></v-combobox>
                            <!-- <v-icon @click.prevent="createAuthor" >mdi-plus</v-icon> -->
                    </div>
                    <div class="switch" v-if="input.type=='switch'">
                        <v-switch
                            v-model="form[input.prop]"
                            :label="input.label"
                        ></v-switch>
                    </div>
                    <div class="treeview" v-if="input.type=='treeview'">
                        <v-treeview
                            selectable
                            v-model="form[input.prop]"
                            :selection-type="input.selectType"
                            :item-text="input.inputText"
                            :item-value="input.inputValue"
                            :items="input.items"
                        ></v-treeview>
                        <!-- <v-btn @click.prevent="saveCategories">save my choices</v-btn> -->
                    </div>
            </v-col>
            <v-col cols="12">
                <v-btn
                    color="success"
                    class="mr-4  w-full block mt-8"
                    :disabled="!opts.valid && opts.errors.length == 0"
                    :loading="opts.loading"
                    @click.prevent="submit"
                    >
                    Submit
                </v-btn>
            </v-col>
        </v-row>
      </v-form>   
    </v-card-text>
 </v-card> 
</template>


<script>
import form from "@/mixins/form.js"

  export default {
    mixins : [form],
}
</script>