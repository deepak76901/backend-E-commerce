const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true , "Name is required"],
        trim:true

    },
    description:{
        type:String,
        required : [true , "description is required"]
    },
    price:{
        type:Number,
        required : [true , "Price is required"],
        maxLength : [8 , "price cannot exceed 8 characters"]
    },
    rating:{
        type : Number,
        default : 0,
    },
    images:[
        {
            public_id:{
                type : String,
                required:true
            },
            url:{
                type : String,
                required:true
            }
    
        }
    ],
    category : {
        type : String,
        required : [true , "Please enter product category"]
    },
    stock : {
        type : Number,
        required : [false , "Please enter stock of product"],
        maxLength : [4 , "Stock not exceed 4 characters"],
        default:1

    },
    numOfReviews : {
        type : Number,
        default : 0
    },
    reviews:[
        {
            name : {
                type : String,
                required:false
            },
            rating : {
                type : Number,
                required:false
            },
            comment : {
                type : String,
                required:false
            }
        }
    ],
    createdAt: {
        type : Date,
        default:Date.now
    }
})


module.exports = mongoose.model("Product" , productSchema)