import {
    title,
    name,
    slug,
    password,
    email,
    discount_percent,
    isbn,
    description,
    price,
    thumbnail,
    qty,
    author,
    language,
    branch,
    branch_to,
    customer,
    supplier,
    document,
    website
} from '@/common/Inputs.js'
import {editAddProduct ,editAddDocItem, login , editAddDoc , editAddBranch , craeteReturnDoc} from '@/common/FormActions.js'
export default class DatatableDirector {
    constructor(builder){
        this.builder = builder
    }
    
   
    makeEditAddProduct() {
        const  inputs  =  [
            title,
            slug,
            isbn,
            description,
            price,
            thumbnail,
            author,
            language,
            website
        ]
        return this.builder
            .setTitle('Create product')
            .setInputs(inputs)
            .setEditUrl('products/find/id')
            .setCols(12)
            .setErrors([])
            .setError('')
            .setLoadnng(false)
            .setHiddenable(true)
            .setAction(editAddProduct)
            .build()
    }
    makeEditAddDocItem() {
        const  inputs  =  [
            isbn,
            qty
        ]
        return this.builder
            .setTitle('Insert product')
            .setInputs(inputs)
            .setEditUrl('documents/item/1')
            .setCols(8)
            .setErrors([])
            .setError('')
            .setLoadnng(false)
            .setHiddenable(true)
            .setAction(editAddDocItem)
            .build()
    }

    makeEditAddBranch() {
        const  inputs  =  [
            name,
        ]
        return this.builder
            .setTitle('Fill Branch Data')
            .setInputs(inputs)
            .setEditUrl('branches/find')
            .setCols(12)
            .setErrors([])
            .setError('')
            .setLoadnng(false)
            .setHiddenable(true)
            .setAction(editAddBranch)
            .build()
    }
    makeLogin() {
        const  inputs  =  [
            email,
            password,
        ]
        return this.builder
            .setTitle('Login')
            .setInputs(inputs)
            .setCols(6)
            .setError('')
            .setErrors([])
            .setLoadnng(false)
            .setHiddenable(true)
            .setAction(login)
            .build()
    }
    makeConfigueDoc(type){

    }
    //[(-)[0 : sell , 1 : buy return  ] , (+)[2 : buy , 3 : sell return ], (=)[4 : inventory , 5 : define , 6 : first balance] , (+ , -)[7 : transactions]]
    makeEditAddDoc(ctx) {
        let inputs = []
        const type = ctx.$route.params.type
        // set branch input on needed
        //sell , buy , inventory , first balance , transactions
        //execlude sell return , buy return , define
        //validate that user dosn't have branch
        if((type !== 1 || type !== 3 || type !== 5) && ctx.$auth.user.branch_id == null){
            if(!ctx.$route.params.doc){
                inputs.push(branch)
            }
        }
        //sell
        if(type == 0){
            inputs.push(customer)
            inputs.push(discount_percent)
            // inputs.push(discount_value)
        } 
        //buy return or sell return
        if(type == 1 || type == 3){
            inputs.push(document)
        }
        //buy
        if(type == 2){
            inputs.push(supplier)
            inputs.push(discount_percent)
        }
        //transactions
        if(type == 6){
            inputs.push(branch_to)
        }
        
        //check if doc param is set to change title to configure instead of create
        const title = ctx.$route.params.doc ? 'configure document' : 'create document'
        return this.builder
            .setTitle(title)
            .setInputs(inputs)
            .setCols(12)
            .setError('')
            .setErrors([])
            .setEditUrl('documents/find')
            .setLoadnng(false)
            .setHiddenable(false)
            .setAction(editAddDoc)
            .build()
    }

    makeReturnDoc() {
        let inputs = [document]
        const title = 'create return document'
        return this.builder
            .setTitle(title)
            .setInputs(inputs)
            .setCols(12)
            .setError('')
            .setErrors([])
            .setLoadnng(false)
            .setAction(craeteReturnDoc)
            .build()
    }
};