import {
    languageFilter,
    pageFilter,
    categoryFilter,
    ageFilter,
    branchFilter,
    closedFilter,
    typeFilter,
    roleFilter,
    imageFilter,
} from "@/common/Filters.js"
export default class DatatableDirector {
    constructor(builder){
        this.builder = builder
    }
    
    makeProducts() {
        const  filters  =  [
            languageFilter(),
            pageFilter(),
            categoryFilter(),
            ageFilter(),
            imageFilter()
        ]
        const  headers  =  [
            { text: 'isbn', value: 'isbn' , align: "center" },
            { text: 'title', value: 'title' , align: "center" },
            { text: 'price', value: 'price' , align: "center" },
            { text: 'thumbnail', value: 'thumbnail' , align: "center" },
            { text: 'actions', value: 'actions' , align: "center"},
        ]
        return this.builder
                .setTitle('products')
                .setUrl('products')
                .setHeaders(headers)
                .setFilters(filters)
                .build()
    }
    makeDocuments() {
        const  filters  =  [
            branchFilter(),
            closedFilter(),
            typeFilter(),
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
                .setTitle('documents')
                .setUrl('documents')
                .setHeaders(headers)
                .setFilters(filters)
                .build()
    }
    makeDocumentItems() {
        const  filters  =  []
        
        const  headers  =  [
            { text: 'id', value: 'id' , align: "center" },
            { text: 'isbn', value: 'isbn' , align: "center"},
            { text: 'title', value: 'title' , align: "center" },
            { text: 'price', value: 'price' , align: "center" },
            { text: 'quantity', value: 'qty' , align: "center"},
            { text: 'real quantity', value: 'real_qty' , align: "center" },
            { text: 'actions', value: 'actions' , align: "center" },
        ]
        return this.builder
                .setTitle('document items')
                .setUrl('documents/items')
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
        ]
        return this.builder
                .setTitle('users')
                .setUrl('user/list')
                .setHeaders(headers)
                .setFilters(filters)
                .build()
    }

};