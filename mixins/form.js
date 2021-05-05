import {mapGetters} from "vuex"
export default {
    props : ['opts'],
    computed: {
      ...mapGetters({
        ages: 'global/ages',
        errors: 'product/createError',
        authors: 'global/authors',
        categories: 'global/categories',
        languages: 'global/languages',
      }),
    },
    data(){
      return {
        valid : false,
        metaLocalStorageKey : "create_product_meta_hidden",
        metaHidden : false,
        actions : [
          'global/getLanguages',
          'global/getAuthors',
          'global/getAges',
        ],
        form : {
          title : null,
          thumbnail : null,
          image : null,
          slug : null,
          isbn : null,
          description : null,
          price : null,
          categories : [],
          author_id : null,
          language_id : null,
          age_id : null,
          old_price : null,
          website : false,
        },
        productRules : {
          title : [
            v => !!v || 'title is required',
            // v => v.length > 255 || 'title must be less than 255 character',
          ],
          thumbnail : [],
          image : [],
          slug : [
            v => !!v || 'slug is required',
            // v => v.length > 255 || 'slug must be less than 255 character',
  
          ],
          isbn : [
            v => !!v || 'isbn is required',
            // v => v.length > 255 || 'isbn must be less than 255 character',
          ],
          description : [
            v => v.length > 255 || 'description must be less than 255 character',
            // v => !!v || 'description is required',
          ],
          price : [
            v => !!v || 'price is required',
            v => (v && !isNaN(v)) || 'this field must be a valid price',
          ],
          author_id : [
            v => (v && !isNaN(v)) || 'this field must be a valid',

          ],
          language_id : [
            v => (v && !isNaN(v)) || 'this field must be a valid',
          ],
          age_id : [
            v => (v && !isNaN(v)) || 'this field must be a valid',
          ],
          old_price : [
            v => (v && !isNaN(v)) || 'this field must be a valid price',

          ],
          website : [],
        },
      }
    },
    watch:{
       metaHidden: {
            handler () {
              localStorage.setItem(this.metaLocalStorageKey , this.metaHidden)
            },
            deep: true,
          },
    },
    methods :{
      saveCategories(){
        localStorage.setItem(`${this.$route.name}-categories` , JSON.stringify(this.productForm.categories))
      },
      async createProduct(){
        await this.$refs.productForm.validate()
          if(this.valid){   
            this.$store.dispatch('product/create' , this.productForm)
            .then(res => {
              this.$refs.productForm.reset()
              this.form.product = res.id
              this.$emit('created')
              console.log('asasdas')
            })
            .catch(() => {
              this.valid = true
            })
          }
      },
      authorCreated(res){
        this.productForm.author_id = res.id
      },
      createAuthor(){
        this.$store.commit('ui/authorModal' , true)
      }
    },
    created(){
      this.actions.forEach(action => {
        this.$store.dispatch(`${action}`)
      })
       this.$store.dispatch(`global/getCategories`)
       .then(() => {
          const savedCategories = JSON.parse(localStorage.getItem(`${this.$route.name}-categories`))
          this.productForm.categories = savedCategories
  
       })
      //set the meta hidden value which responsible for hiding the unecessary fields on the product 
      // to its previous value selected on this browser
      let metaHidden = localStorage.getItem(this.metaLocalStorageKey)
      if( typeof metaHidden !== 'undefined'){
        // parsing string value from locale storage to boolean
        metaHidden = metaHidden === 'true'
        this.metaHidden = metaHidden
      }
    },
  }