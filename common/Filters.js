export const languageFilter = () =>{
    return {
        type : 'select',
        items : [],
        clearable : true,
        itemText : 'title',
        prop : 'language',
        url : 'languages',
        itemValue : 'slug',
        label : 'language'
    }
}
export const pageFilter = () =>{
    return {
        type : 'number',
        prop : 'page',
        clearable : false,
        label : 'page'

    }
}

export const fromFilter = () =>{
    return {
        type : 'date',
        prop : 'from',
        clearable : true,
        value : new Date().toISOString().substr(0, 10),
        menue : false,
        ref:"from",
        label : 'from'

    }
}
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

export const toFilter = () =>{
    return {
        type : 'date',
        prop : 'to',
        clearable : true,
        value : tomorrow,
        menue : false,
        ref:"to",
        label : 'to'

    }
}
export const categoryFilter = () =>{
    return {
        type : 'select',
        items : [],
        clearable : true,
        itemText : 'title',
        prop : 'category',
        itemValue : 'slug',
        url : 'categories',
        label : 'category'
    }
}
export const ageFilter = () =>{
    return {
        type : 'select',
        items : [],
        clearable : true,
        itemText : 'title',
        prop : 'age',
        itemValue : 'slug',
        url : 'ages',
        label : 'age'
    }
}
export const branchFilter = () =>{
    return {
        type : 'select',
        items : [],
        clearable : true,
        itemText : 'name',
        prop : 'branch',
        itemValue : 'id',
        url : 'branches',
        label : 'branch'
    }
}
export const roleFilter = () =>{
    return {
        type : 'select',
        items : [],
        clearable : true,
        itemText : 'name',
        prop : 'role',
        itemValue : 'id',
        url : 'roles',
        label : 'role'
    }
}
export const docFilter = () =>{
    return {
        type : 'hidden',
        prop : 'doc',
        value : 'params.document',
    }
}
export const imageFilter = () =>{
    return {
        type : 'select',
        items : [
          {title : 'no image' , value : 0},
          {title : 'with image' , value : 1},
        ],
        clearable : true,
        itemText : 'title',
        itemValue : 'value',
        prop :"image",
        url : '',
        label : 'image'
    }
}
export const closedFilter = () =>{
    return {
        type : 'select',
        items : [
          {title : 'closed' , value : 1},
          {title : 'open' , value : 0},
        ],
        clearable : true,
        itemText : 'title',
        itemValue : 'value',
        prop :"closed",
        url : '',
        label : 'closed'
    }
}
export const typeFilter = () =>{
    return {
        type : 'select',
        items : [
          {title : 'sell' , value : 0},
          {title : 'sell return' , value : 3},
          {title : 'buy' , value : 2},
          {title : 'buy return' , value : 1},
          {title : 'inventory' , value : 4},
          {title : 'define' , value : 5},
          {title : 'first balance' , value : 6},
          {title : 'transaction' , value : 7},
        ],
        clearable : true,
        itemText : 'title',
        itemValue : 'value',
        prop :"type",
        url : '',
        label : 'type'
    }
}