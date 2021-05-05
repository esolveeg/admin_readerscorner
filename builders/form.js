// src/builders/ListingBuilder.js

export default class DatatableBuilder {
    constructor(){
        this.datatable = {}
    }
    setTitle(title){
        this.datatable.title = title
        return this
    }
    setHeaders(headers){
        this.datatable.headers = headers
        return this
    }
    setFilters(filters){
        this.datatable.filters = filters
        return this
    }
    
    setUrl(url){
        this.datatable.url = url
        return this
    }
    
    build() {
        return this.datatable
    }
};