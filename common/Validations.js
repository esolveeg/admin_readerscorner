
export const  required = v => !!v || 'this field is required'
export const  min6 = v => !!v || 'this field is required'
export const  email = v => /.+@.+/.test(v) || 'this field must be a valid email'
export const  man255 = v => v.length > 255 || 'this field must be less than 255 character'
export const  number = v => {
    if(v && isNaN(v)){
        return 'this field must be a valid number'
    }
}
export const  positive = v => (v && !isNaN(v) && v > 0) || 'this field must be a positive Number'
export const  percent = v => {
    if(v && (v < 0 || v > 100)){
        return 'this field must be a valid percent'
    }
}
// export const min6 = v => v.length >= 6 || 'this field must be more than than 6 characters'
// productRules : {
//     title : [
//       v => !!v || 'title is required',
//       // v => v.length > 255 || 'title must be less than 255 character',
//     ],
//     thumbnail : [],
//     image : [],
//     slug : [
//       v => !!v || 'slug is required',
//       // v => v.length > 255 || 'slug must be less than 255 character',

//     ],
//     isbn : [
//       v => !!v || 'isbn is required',
//       // v => v.length > 255 || 'isbn must be less than 255 character',
//     ],
//     description : [
//       v => v.length > 255 || 'description must be less than 255 character',
//       // v => !!v || 'description is required',
//     ],
//     price : [
//       v => !!v || 'price is required',
//       v => (v && !isNaN(v)) || 'this field must be a valid price',
//     ],
//     author_id : [
//       v => (v && !isNaN(v)) || 'this field must be a valid',

//     ],
//     language_id : [
//       v => (v && !isNaN(v)) || 'this field must be a valid',
//     ],
//     age_id : [
//       v => (v && !isNaN(v)) || 'this field must be a valid',
//     ],
//     old_price : [
//       v => (v && !isNaN(v)) || 'this field must be a valid price',

//     ],
//     website : [],
//   },