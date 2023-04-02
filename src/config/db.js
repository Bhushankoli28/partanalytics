

const mongoose = require ("mongoose");

mongoose.set("strictQuery",false);

module.exports =() =>{
    return mongoose.connect("mongodb+srv://Bhushan_Api:2VMprkBKVCnRnYLC@cluster0.j2sd4qh.mongodb.net/?retryWrites=true&w=majority")
}