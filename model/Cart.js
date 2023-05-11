const mongoose = require('mongoose')

const Schema  = mongoose.Schema

const cartSchema = new Schema({
    productid : {
        type : String, 
        required : true
    },
    useremail : {
        type: String,
        required : true
    },
    quantity : {
        type: Number
    }
})

module.exports = mongoose.model('carts', cartSchema)
