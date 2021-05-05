import http from '@/common/Http.js'
export default {
    props : ['opts'],
    data(){
      return {
        valid : false,
        metaHidden : false,
        errors : [],
        form : {
        },
      }
    },
    watch:{
       metaHidden: {
            handler () {
              localStorage.setItem(`${this.$route.name}-meta-hidden` , this.metaHidden)
            },
            deep: true,
          },
    },
    methods :{
      async submit(){
        console.log('asdas')
        this.opts.loading = true
        await this.$refs.form.validate()
        this.$emit('submitted' , this.form)
        if(this.valid){   
          // this.opts.loading = false

        }
      },
      // saveCategories(){
      //   localStorage.setItem(`${this.$route.name}-categories` , JSON.stringify(this.productForm.categories))
      // },
      // async createProduct(){
      //   await this.$refs.productForm.validate()
      //     if(this.valid){   
      //       this.$store.dispatch('product/create' , this.productForm)
      //       .then(res => {
      //         this.$refs.productForm.reset()
      //         this.form.product = res.id
      //         this.$emit('created')
      //         console.log('asasdas')
      //       })
      //       .catch(() => {
      //         this.valid = true
      //       })
      //     }
      // },
      // authorCreated(res){
      //   this.productForm.author_id = res.id
      // },
      // createAuthor(){
      //   this.$store.commit('ui/authorModal' , true)
      // }
    },
    created(){
      //set the meta hidden value which responsible for hiding the unecessary fields on the product 
      // to its previous value selected on this browser
      let metaHidden = localStorage.getItem(this.metaLocalStorageKey)
      if( typeof metaHidden !== 'undefined'){
        // parsing string value from locale storage to boolean
        metaHidden = metaHidden === 'true'
        this.metaHidden = metaHidden
      }

      //loop over inputs to get selects items 
      this.opts.inputs.forEach(input => {
        if(input.type == 'select' && input.items.length == 0){
          input.loading = true
          http.get(input.url)
              .then(res => {
                input.loading = false
                input.items = res.data
              })
        }
      })
    },
  }