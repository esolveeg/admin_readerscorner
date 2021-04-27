export default {
    data(){
        return {
            createLoading : false,
        }
    },
    methods :{
        create(){
            this.$store.dispatch(this.docOptions.action , {type : this.docType})
            .then(res => {
                this.$router.push({name : this.docOptions.route , params : {id : res.id}})
            })
            console.log('create')
        }
    }
}