<template>
  <div>
      <builders-form :opts="opts" @submitted="submitted"/>
  </div>
</template>
<script>
import FormBuilder from "@/builders/form.js"
import FormDirector from "@/builders/formDirector.js"
//  title : null,
//           thumbnail : null,
//           image : null,
//           slug : null,
//           isbn : null,
//           description : null,
//          
  export default {
    data(){
      const opts = {
        cols : '12',
        loading : false,
        title : 'test',
        hiddenable : true,
        inputs : [
          {
            type : "text",
            prop : "title",
            ref : "title",
            cols : 6,
            enter : ()=>{console.log('enter')},
            label : 'title',
            rules : [],
            
          },
          {
            type : "text",
            prop : "thumbnail",
            ref : "thumbnail",
            cols : 6,
            enter : ()=>{console.log('enter')},
            label : 'thumbnail',
            rules : [],
            
          },
          {
            type : "text",
            prop : "slug",
            ref : "slug",
            cols : 6,
            enter : ()=>{console.log('enter')},
            label : 'slug',
            rules : [],
            
          },
          {
            type : "text",
            prop : "isbn",
            ref : "isbn",
            cols : 6,
            enter : ()=>{console.log('enter')},
            label : 'isbn',
            rules : [],
            
          },
          {
            type : "textarea",
            prop : "description",
            ref : "description",
            rows: 1,
            cols : 6,
            enter : ()=>{console.log('enter')},
            label : 'description',
            rules : [],
            
          },
          {
            type : "text",
            prop : "price",
            ref : "price",
            cols : 6,
            enter : ()=>{console.log('enter')},
            label : 'price',
            rules : [],
            
          },
          {
            type : "select",
            items : [],
            url : 'authors',
            prop : "author_id",
             inputText: "title",
            inputValue: "id",
            ref : "author",
            cols : 6,
            enter : ()=>{console.log('enter')},
            label : 'author',
            rules : [],
            
          },
          {
            type : "select",
            items : [],
            url : 'languages',
            prop : "language_id",
            inputText: "title",
            inputValue: "id",
            ref : "language",
            cols : 6,
            enter : ()=>{console.log('enter')},
            label : 'language',
            rules : [],
            
          },
          {
            type : "text",
            prop : "price",
            ref : "price",
            cols : 6,
            enter : ()=>{console.log('enter')},
            label : 'price',
            rules : [],
            
          },
           {
            type : "text",
            prop : "old_price",
            ref : "old_price",
            cols : 6,
            enter : ()=>{console.log('enter')},
            label : 'old price',
            rules : [],
            
          },
          {
            type : "switch",
            prop : "website",
            ref : "website",
            cols : 6,
            enter : ()=>{console.log('enter')},
            label : 'website',
            rules : [],
            
          },
          
        ],

      }
      return {
        opts
      }
    },
    methods :{
      submitted(form){
        setTimeout(() => {
          this.opts.loading = false
          
        }, 3000);
        console.log(form)
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