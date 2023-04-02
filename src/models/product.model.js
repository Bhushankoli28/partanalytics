

const mongoose = require("mongoose");

const product = new mongoose.Schema({
    productname: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, required:true }

},
    {
        timestamps: true,
        versionKey: false

    })

module.exports = mongoose.model("products", product)