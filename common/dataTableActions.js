const docAction = (ctx , payload) => {
    ctx.$store.dispatch("document/create" , payload)
    .then(res => {
        ctx.opts.createLoading = false
        if(ctx.$route.params.type == 5){
            ctx.$router.push({name : "products-doc-edit" , params : {doc : res.id}})
            return
        }
        ctx.$router.push({name : 'documents-type-doc-doc' , params : {type : ctx.$route.params.type, doc : item.id}})
    })
}
export const createDoc = (ctx) => {
    console.log('asdd')
    const payload = {type : ctx.$route.params.type}
    //check if document type is define products to execlude branch
    if(ctx.$route.params.type == 5){
        console.log('asdd')
        docAction(ctx , payload)
    } else {
        //check if user has branch
        if(ctx.$auth.user.branch_id){
            payload.branch = ctx.$auth.user.branch_id
            docAction(ctx , payload)
        } else {
            //show select branch modal when no branch on user
            ctx.$store.commit("ui/createDocModal" , true)
        }   
    }    
}

export const createBranch = ctx => {
    ctx.$router.push({name : 'branches-create'})
    
}
export const editBranch = (ctx , item) => {
    ctx.$router.push({name : 'branches-id' , params : {id : item.id}})
    
}


export const editProduct = (ctx , item) => {
    ctx.$router.push({name : 'products-id' , params : {id : item.id}})
}

export const viewProduct = (ctx , item) => {
    ctx.$router.push({name : 'products-id-view' , params : {id : item.id}})
}
export const viewDoc = (ctx , item) => {
    ctx.$router.push({name : 'documents-type-doc-view' , params : {type:ctx.$route.params.type,doc : item.id}})
}

export const editDoc = (ctx , item) => {
    //check if document type is define products to execlude branch
    if(ctx.$route.params.type == 5){
        ctx.$router.push({name : 'product-doc-edit' , params : {doc : item.id}})
    } else{
        ctx.$router.push({name : 'documents-type-doc-doc' , params : {type : ctx.$route.params.type, doc : item.id}})
    }
}