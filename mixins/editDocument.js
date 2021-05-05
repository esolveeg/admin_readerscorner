import { mapGetters } from 'vuex'
export default {
  data(){
    return {
      valid:false,
      productErr:'',  
      closeModal:false,
      
      
      item :null,
    }
  },
  computed: {
      ...mapGetters({
        productLoading: 'global/productLoading',
        closeLoading: 'inventory/closeLoading'
      }),
    },
  methods:{
    addItem(){
      this.form.doc = this.$route.query.doc
      this.$route.query.branch ? this.form.branch = this.$route.query.branch :''
      this.$store.dispatch('inventory/insertItem' , this.form)
      .then(() => {
        this.$refs.form.resetValidation()
        this.form = {
          product : '',
          qty : 1,
        },
        this.$refs.product.focus()
      })
    },
    closeDocument(){
      this.$store.dispatch('inventory/close' , this.$route.query.doc)
      .then(() => {
        this.$router.push({name: 'inventory'})
      })
    },
    findProduct(){
      this.$store.dispatch('global/getProduct' , this.form.product)
      .then(res => {
        this.productErr = ""
        this.item = res
        this.$refs.qty.focus()
      })
      .catch(() => {
        this.productErr = "this product not found"
      })
    },
    reset () {
      this.$refs.form.reset()
    },
  },
}