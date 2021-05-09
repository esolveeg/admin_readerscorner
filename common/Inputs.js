import {required ,percent,  email as emailValidation , min6, number, positive} from '@/common/Validations.js'


export const title = {
    type : "text",
    inputType : "text",
    prop : "title",
    ref : "title",
    enter : ()=>{console.log('enter')},
    cols : 6,
    label : 'title',
    rules : [required],
}
export const email = {
    type : "text",
    prop : "email",
    inputType : "email",
    ref : "email",
    enter : ()=>{console.log('enter')},
    cols : 12,
    label : 'email',
    rules : [required , emailValidation],
}
export const password = {
    type : "text",
    inputType : "password",
    prop : "password",
    ref : "password",
    enter : ()=>{console.log('enter')},
    cols : 12,
    label : 'password',
    rules : [required , min6],
}
export const slug ={
    type : "text",
    inputType : "text",
    prop : "slug",
    ref : "slug",
    cols : 6,
    enter : ()=>{console.log('enter')},
    label : 'slug',
    rules : [required],
    
}

export const name ={
  type : "text",
  inputType : "text",
  prop : "name",
  ref : "name",
  cols : 6,
  enter : ()=>{console.log('enter')},
  label : 'name',
  rules : [required],
  
}
const enter =(ctx)=>{
  ctx.$store.dispatch('global/getProduct' , ctx.form.isbn)
  .then(res => {
    isbn.hint = res.title
    ctx.$refs.isbn[0].errorMessages = null

    ctx.$refs.qty[0].focus()
  })
  .catch(() => {
    ctx.$refs.isbn[0].errorMessages = 'not found'
  })
}
export const isbn ={
    type : "text",
    inputType : "text",
    prop : "isbn",
    ref : "isbn",
    hint : "",
    cols : 12,
    enter ,
    label : 'isbn',
    rules : [required],
    
}

export const description = {
    type : "textarea",
    inputType : "textarea",
    prop : "description",
    ref : "description",
    rows: 1,
    cols : 6,
    enter : ()=>{console.log('enter')},
    label : 'description',
    meta : true,
    rules : [],
}
export const document = {
    type : "text",
    inputType : "text",
    prop : "document",
    ref : "document",
    cols : 12,
    enter : ()=>{console.log('enter')},
    label : 'document',
    rules : [required,number, positive],
    
}
export const discount_value = {
    type : "text",
    inputType : "text",
    prop : "discount_value",
    ref : "discount_value",
    cols : 12,
    enter : ()=>{console.log('enter')},
    label : 'discount value',
    rules : [number],
    
}
export const discount_percent = {
    type : "text",
    inputType : "text",
    prop : "discount_percent",
    ref : "discount_percent",
    cols : 12,
    enter : ()=>{console.log('enter')},
    label : 'discount percent',
    rules : [number,percent],
    
}
export const qty = {
    type : "text",
    inputType : "text",
    prop : "qty",
    ref : "qty",
    cols : 12,
    enter : ctx=>{
      ctx.$refs.isbn[0].focus()
      ctx.submit()
    },
    label : 'quantity',
    rules : [required,number, positive],
    
}
export const price = {
    type : "text",
    inputType : "text",
    prop : "price",
    ref : "price",
    cols : 6,
    enter : ()=>{console.log('enter')},
    label : 'price',
    rules : [required,number, positive],
    
}
export const thumbnail ={
    type : "text",
    inputType : "text",
    prop : "thumbnail",
    ref : "thumbnail",
    cols : 6,
    enter : ()=>{console.log('enter')},
    label : 'thumbnail',
    rules : [],
    meta : true,
  }
export const author ={
    type : "combobox",
    items : [],
    url : 'authors',
    prop : "author_id",
    inputText: "name",
    inputTnputText: "name",
    inputValue: "id",
    ref : "author",
    cols : 6,
    enter : ()=>{console.log('enter')},
    label : 'author',
    meta : true,
    rules : [],
    
  }

  export const language ={
    type : "select",
    items : [],
    url : 'languages',
    prop : "language_id",
    inputText: "title",
    inputTnputText: "title",
    inputValue: "id",
    ref : "language",
    cols : 6,
    enter : ()=>{console.log('enter')},
    meta : true,
    label : 'language',
    rules : [],
    
  }

  export const branch ={
    type : "select",
    items : [],
    url : 'branches',
    prop : "branch_id",
    inputText: "name",
    inputValue: "id",
    ref : "branch",
    cols : 12,
    enter : ()=>{console.log('enter')},
    meta : true,
    label : 'branch',
    rules : [],
    
  }

  export const branch_to ={
    type : "select",
    items : [],
    url : 'branches',
    prop : "branch_to",
    inputText: "name",
    inputValue: "id",
    ref : "branch_to",
    cols : 12,
    enter : ()=>{console.log('enter')},
    meta : true,
    label : 'branch to',
    rules : [],
    
  }
  

  export const supplier ={
    type : "select",
    items : [],
    url : 'suppliers',
    prop : "account_id",
    inputText: "name",
    inputValue: "id",
    ref : "supplier",
    cols : 12,
    enter : ()=>{console.log('enter')},
    meta : true,
    label : 'supplier',
    rules : [],
    
  }

  export const customer ={
    type : "select",
    items : [],
    url : 'customers',
    prop : "account_id",
    inputText: "name",
    inputValue: "id",
    ref : "customer",
    cols : 12,
    enter : ()=>{console.log('enter')},
    meta : true,
    label : 'customer',
    rules : [],
    
  }


  export const website ={
    type : "switch",
    prop : "website",
    ref : "website",
    cols : 6,
    enter : ()=>{console.log('enter')},
    label : 'website',
    meta : true,
    rules : [],
  }