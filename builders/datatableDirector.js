import {
    languageFilter,
    pageFilter,
    categoryFilter,
    ageFilter,
    branchFilter,
    closedFilter,
    
    fromFilter,
    toFilter,
    roleFilter,
    imageFilter,
} from "@/common/Filters.js"

import {createDoc , createProduct , viewProduct, editProduct , viewDoc, editDoc , createBranch , editBranch} from "@/common/dataTableActions.js"
export default class DatatableDirector {
    constructor(builder){
        this.builder = builder
    }
    
    makeProducts() {
        const  filters  =  [
            languageFilter(),
            categoryFilter(),
            ageFilter(),
            imageFilter()
        ]
        const  headers  =  [
            { text: 'id', value: 'id' , align: "center" },
            { text: 'isbn', value: 'isbn' , align: "center" },
            { text: 'title', value: 'title' , align: "center" },
            { text: 'price', value: 'price' , align: "center" },
            { text: 'thumbnail', value: 'thumbnail' , align: "center" },
            { text: 'actions', value: 'actions' , align: "center"},
        ]
        return this.builder
                .setTitle('products')
                .setUrl('products')
                .setCreateLoading(false)
                .setCreate(createProduct)
                .setEdit(editProduct)
                .setViewable(true)
                .setView(viewProduct)
                .setTable('products')
                .setHeaders(headers)
                .setFilters(filters)
                .build()
    }
    makeDocuments(title) {
        const  filters  =  [
            branchFilter(),
            closedFilter(),
            fromFilter(),
            toFilter()
        ]
        const  headers  =  [
            { text: 'id', value: 'id' , align: "center" },
            { text: 'created by', value: 'created_by' , align: "center" },
            { text: 'created at', value: 'created_at' , align: "center" },
            { text: 'branch', value: 'branch_name' , align: "center" },
            { text: 'closed at', value: 'closed_at' , align: "center" },
            { text: 'actions', value: 'actions' , align: "center"},
        ]
        return this.builder
                .setTitle(title)
                .setTable('documents')
                .setUrl('documents')
                .setCreate(createDoc)
                .setEdit(editDoc)
                .setViewable(true)
                .setView(viewDoc)
                .setCreateLoading(false)
                .setHeaders(headers)
                .setFilters(filters)
                .build()
    }
    makeDocumentItems(ctx) {
        const  filters  =  []
        let  headers  =  [
            { text: 'id', value: 'id' , align: "center" },
            { text: 'isbn', value: 'isbn' , align: "center"},
            { text: 'title', value: 'title' , align: "center" },
            { text: 'price', value: 'price' , align: "center" },
            { text: 'quantity', value: 'qty' , align: "center"},
        ]
        if(ctx.$route.name != 'documents-type-doc-view'){
            headers.push(
                { text: 'actions', value: 'actions' , align: "center" },
            )
        }
        return this.builder
                .setTitle('document items')
                .setTable('document_product')
                .setUrl('documents/items')
                .setRememberAble(false)
                .setCreateLoading(false)
                .setCreateAble(false)
                .setEditable(false)
                .setHeaders(headers)
                .setFilters(filters)
                .build()
    }
            
    makeUsers() {
        const  filters  =  [
            branchFilter(),
            roleFilter(),
        ]
        
        const  headers  =  [
            { text: 'id', value: 'id' , align: "center" },
            { text: 'name', value: 'name' , align: "center" },
            { text: 'email', value: 'email' , align: "center"},
            { text: 'phone', value: 'phone' , align: "center"},
            { text: 'branch', value: 'branch' , align: "center" },
            { text: 'role', value: 'role' , align: "center" },
            { text: 'created at', value: 'created_at' , align: "center" },
            { text: 'actions', value: 'actions' , align: "center" },
        ]
        return this.builder
                .setTitle('users')
                .setTable('users')
                .setUrl('user/list')
                .setCreateLoading(false)
                .setHeaders(headers)
                .setFilters(filters)
                .build()
    }

    makeBranches() {
        const  filters  =  [
        ]
        
        const  headers  =  [
            { text: 'id', value: 'id' , align: "center" },
            { text: 'name', value: 'name' , align: "center" },
            { text: 'actions', value: 'actions' , align: "center" },
        ]
        return this.builder
                .setTitle('branches')
                .setTable('branches')
                .setUrl('branches/list')
                .setCreateLoading(false)
                .setCreateLoading(false)
                .setCreate(createBranch)
                .setEdit(editBranch)
                .setHeaders(headers)
                .setFilters(filters)
                .build()
    }

};