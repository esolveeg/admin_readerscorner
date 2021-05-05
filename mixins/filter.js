export default {
    data(){
        return {
        }
    },
    methods : {
        filter(){
          const form = this.clearNullValues(this.form)
          this.getData(form)
          this.addParamsToLocation(form)
        },
        clearNullValues(form){
          const clone = {...form}
          Object.keys(clone).forEach(key => {
            clone[key] === null || ''? delete clone[key] : ''
          })
          return clone
        },
        saveFilters(){
          const form = this.clearNullValues(this.form)
          localStorage.setItem(`${this.$route.name}-filter` , JSON.stringify(form))
        },
        addParamsToLocation(params) {
          return new Promise( resolve => {
            history.pushState(
                {},
                null,
                this.$route.path +
                '?' +
                Object.keys(params)
                    .map(key => {
                    return (
                        encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
                    )
                    })
                    .join('&')
            )
            window.scrollTo({ top:0, behavior: 'smooth'});
            resolve(true)
          })
      },
    },

    created(){
      //get all saved filters
      const saved = JSON.parse(localStorage.getItem('products-filter'))
      //check if thers is any vuex actions to grap for filters
      if(typeof this.filters !== 'undefined'){
        this.filters.forEach(filter => {
          this.$store.dispatch(`${filter}`)
        })
      }
    },

    
    watch: {
        options: {
          handler () {
            this.form.show = this.options.itemsPerPage
            this.form.page = this.options.page
            const form = this.clearNullValues(this.form)
            this.getData(form)
          },
          deep: true,
        },
        form: {
          handler () {
            this.filter()
          },
          deep: true,
        },
      },
}