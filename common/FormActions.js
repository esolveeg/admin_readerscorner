import Http from "@/common/Http.js"
const setErr = (err , ctx) => {
    ctx.opts.loading = false
    typeof err.errors !== 'undefined' ? ctx.opts.errors = err.errors : ctx.opts.error = err
}
const clearErr = ctx =>{
    ctx.opts.errors = []
    ctx.opts.loading = false
    ctx.opts.error = ''
}
export const editAddDocItem = async (ctx) => {
    ctx.opts.loading = true
    await ctx.$refs.form.validate()
    
    
        //check if id param is set to perform edit action
        if(ctx.$route.params.id){
            Http.put(`documents/${ctx.$route.params.id}/${ctx.form.qty}/qty/`)
            .then(() => {
                clearErr(ctx)
                
                
                const snackbar = {
                    active : true,
                    text: 'quantity updated successfully'
                }
                ctx.$store.commit('ui/setSnackbar' , snackbar)
                // ctx.$router.push({name : 'products'})
                ctx.$bus.$emit('productCreated', payload )
            })
            .catch(err => {
                setErr(err ,ctx)
            })
        } else {
            // perform create action when no params id
            ctx.$store.dispatch('document/insertItem' , ctx.form)
            .then(res => {
                clearErr(ctx)
                
                
                ctx.opts.loading = false
                ctx.$refs.form.reset()
                const payload = {
                    "product" : res.isbn,
                    "doc" : ctx.$route.params.doc
                }
                ctx.$bus.$emit('productCreated', payload )
                console.log('created' , res)
            })
            .catch(err => {
                setErr(err ,ctx)
            })
        }
}
export const editAddProduct = async (ctx) => {
    ctx.opts.loading = true
    await ctx.$refs.form.validate()
    
    
        //check if id param is set to perform edit action
        if(ctx.$route.params.id){
            Http.put(`products/edit/${ctx.$route.params.id}` , ctx.form)
            .then(() => {
                clearErr(ctx)
                
                
                const snackbar = {
                    active : true,
                    text: 'product edited successfully'
                }
                ctx.$store.commit('ui/setSnackbar' , snackbar)
                ctx.$router.push({name : 'products'})
            })
            .catch(err => {
                setErr(err ,ctx)
            })
        } else {
            // perform create action when no params id
            ctx.$store.dispatch('product/create' , ctx.form)
            .then(res => {
                clearErr(ctx)
                
                
                ctx.opts.loading = false
                ctx.$refs.form.reset()
                const payload = {
                    "product" : res.isbn,
                    "doc" : ctx.$route.params.doc
                }
                ctx.$store.dispatch('document/insertItem' , payload)
                .then(()=>{
                    clearErr(ctx)
                    
                ctx.
                    ctx.$bus.$emit('productCreated', payload )
                })
                console.log('created' , res)
            })
            .catch(err => {
                setErr(err ,ctx)
            })
        }
    
}

export const login = async (ctx) => {
    ctx.opts.loading = true
    await ctx.$refs.form.validate()
    
        ctx.$store.dispatch('myAuth/login' , {"auth" : ctx.$auth ,'form' :ctx.form})
        .then(res => {
            clearErr(ctx)
            
            
            ctx.$refs.form.reset()
            console.log('created' , res)
        })
        .catch(err => {
            setErr(err ,ctx)
        })
    
}

export const editAddBranch = (ctx) => {
    ctx.opts.loading = true
     ctx.$refs.form.validate()
    
         //check if id param is set to perform edit action
         if(ctx.$route.params.id){
            Http.put(`branches/edit/${ctx.$route.params.id}` , ctx.form)
            .then(() => {
                clearErr(ctx)
                
                
                const snackbar = {
                    active : true,
                    text: 'branch edited successfully'
                }
                ctx.$store.commit('ui/setSnackbar' , snackbar)
                ctx.$router.push({name : 'branches'})
            })
            .catch(err => {
                setErr(err ,ctx)
            })
        } else {
            // perform create action when no params id
            Http.post(`branches/create` , ctx.form)
            .then(() => {
                clearErr(ctx)
                
                
                const snackbar = {
                    active : true,
                    text: 'branch createad successfully'
                }
                ctx.$store.commit('ui/setSnackbar' , snackbar)
                ctx.$router.push({name : 'branches'})
            })
            .catch(err => {
                setErr(err ,ctx)
            })
            
        }
}

export const craeteReturnDoc = ctx => {
    ctx.opts.loading = true
    ctx.$refs.form.validate()
    ctx.form.type = ctx.$route.params.type
    const type = ctx.$route.params.type === 0 ? 3 : 1;
    ctx.$store.dispatch('document/createReturn' , ctx.form)
    .then(res => {
        clearErr(ctx)  
            ctx.$refs.form.reset()
            ctx.$emit('created')
            ctx.$router.push({name : 'documents-type-doc-doc' , params : {type, doc : res.id}}) 
        })
        .catch(err => {
            setErr(err.response.data ,ctx)
        })
}
export const editAddDoc = async (ctx) => {
    ctx.opts.loading = true
    await ctx.$refs.form.validate()
    
    if(ctx.$route.params.doc){
        ctx.$store.dispatch(`document/update` , {doc : ctx.$route.params.doc , form : ctx.form})
        .then(res => {
                clearErr(ctx)
                ctx.form = res
                ctx.$store.dispatch('document/findDoc' , ctx.$route.params.doc)

            })
            .catch(err => {
                setErr(err ,ctx)
            })
        return

    }
    
    ctx.$store.dispatch('document/create' , ctx.form)
    .then(res => {
        clearErr(ctx)
        
        
        ctx.$refs.form.reset()
        ctx.$store.commit('ui/createDocModal' , false)
            ctx.$router.push({name : 'documents-type-doc-doc' , params : {type : ctx.$route.params.type, doc : res.id}})
        // ctx.$router.push({name : "documents-doc-doc" , params : {doc : res.id}})
            console.log('createssasdasd' , res)
        })
        .catch(err => {
            setErr(err ,ctx)
        })
    
}

