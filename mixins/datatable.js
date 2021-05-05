import http from '@/common/Http.js'
import {clearNullValues , addParamsToLocation , serializeQuery} from '@/common/Helpers.js'
export default {
    props : ['opts'],
    data(){
        //extract document id from query parameter
        return {
            datatable : {},
            form : {},
            search : {},
            loading : false,
            options : {}
        } 
    },
    methods : {
        getData(){
            this.loading = true
            http.get(`${this.opts.url}?${serializeQuery(clearNullValues(this.form))}`)
            .then(res => {
                this.datatable = res.data
                this.loading = false
                console.log(res.data.items[0])
                // console.log(res.data[0].keys)
            })
        },
        isNumber(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
              evt.preventDefault();;
            } else {
              return true;
            }
          },
        initFilters(){
            this.opts.filters.forEach(filter => {
                if(filter.url && filter.items.length == 0){
                    http.get(filter.url)
                    .then(res => {
                        filter.items = res.data
                    })
                }
            });
        },
        saveFilters(){
            localStorage.setItem(`${this.$route.name}-filter` , JSON.stringify(clearNullValues(this.form)))
            const snackbar = {
                active : true,
                text: 'Your filters has been saved successfully'
            }
            this.$store.commit('ui/setSnackbar' , snackbar)
        },
        filter(){
            this.getData(this.form)
            addParamsToLocation(this.form , this.$route.path)
        },
    },
    watch: {
        options: {
            handler () {
                this.form.show = this.options.itemsPerPage
                this.form.page = this.options.page
                const doc = this.$route.params.doc
                this.form.doc = doc


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
    created(){
        //get the page query
        let query = this.$route.query
        //check if there is no query which means that user just opened the page
        //by other word its not manual refresh to the page
        if(JSON.stringify(query) === '{}'){
            //check if there is filters saved on localstorage
            if(localStorage.getItem(`${this.$route.name}-filter`)){
                //get all saved filters
                const saved = JSON.parse(localStorage.getItem(`${this.$route.name}-filter`))
                this.form = saved
            }
        } else {
            //this code will be executed if we visite the page with query already set
            this.form = query
        }
        this.initFilters()
    },
  
}
