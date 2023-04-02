

const mongoose = require("mongoose");

const product = new mongoose.Schema({
    productname :{type:String,required:true},
    quantity : {type:Number,require:true},
    status : {type:String}

},
{
    timestamps:true,
    versionKey:false

})

module.exports = mongoose.model("products",product)