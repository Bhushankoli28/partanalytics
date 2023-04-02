

const jwt = require("jsonwebtoken")

const secretkey = "koli"

const express = require("express");

const Product = require("../models/product.model");

const User = require("../models/user.model");


const router = express();

function verifytoken(req, res, next) {
    const bearerheader = req.headers["authorization"]
    if (typeof bearerheader !== undefined) {
        const bearer = bearerheader.split(" ")
        const token = bearer[1]
        req.token = token
        next()
    }

    else {
        res.send({ result: "Token is not valid" })
    }
}

router.post("", verifytoken, async (req, res) => {
    try {

        jwt.verify(req.token, secretkey, async (err, authdata) => {
            if (err) {
                return res.send({ result: "invalid token" })

            }
            else {
                const product = await Product.create(req.body)
                return res.send({ message: "token valid", request_id: product._id })
            }
        })

        //  const product = await Product.create(req.body)
        //  jwt.verify(req.token,secretkey,(err,authdata))
        //  return res.send({Requestid:product._id})
    }

    catch (err) {
        return res.send(err.message)
    }

})



router.get("", verifytoken, async (req, res) => {
    try {

        const product = await Product.find()

        jwt.verify(req.token, secretkey, (err, authdata) => {
            if (err) {
                return res.send({ result: "invalid token" })

            }
            else {
                return res.send({ message: "token valid", data: product })
            }
        })
        //  return res.send(product)
    }

    catch (err) {
        return res.send(err.message)
    }

})


router.delete("/:_id", verifytoken, async (req, res) => {
    try {


        // const product = await Product.findById(req.params._id).lean().exec();

        jwt.verify(req.token, secretkey, async (err, authdata) => {
            if (err) {
                return res.send({ result: "invalid token" })

            }
            else {
                const product = await Product.findById(req.params._id)

                if (product.status == "pending") {
                    const result = await product.deleteOne()

                    return res.send({ message: "token valid", status: "Success" })
                }

            }
        })
        //  return res.send(product)
    }

    catch (err) {
        return res.send(err.message)
    }

})


router.get("/admin", verifytoken, async (req, res) => {
    try {

        //  const product = await Product.find()

        jwt.verify(req.token, secretkey, async (err, authdata) => {
            if (err) {
                return res.send({ result: "invalid token" })

            }
            else {

                const user = await User.findOne({ email: authdata.data.email })

                if (user.role === "admin") {

                    const product = await Product.find({ status: "pending" })

                    return res.send({ message: "token valid", data: product })

                }
                else {
                    return res.send({ result: "admin not found", })
                }

            }
        })
        //  return res.send(product)
    }

    catch (err) {
        return res.send(err.message)
    }

})


router.put("/admin/:_id", verifytoken, async (req, res) => {
    try {

        //  const product = await Product.find()

        jwt.verify(req.token, secretkey, async (err, authdata) => {
            if (err) {
                return res.send({ result: "invalid token" })

            }
            else {

                const user = await User.findOne({ email: authdata.data.email })

                if (user.role === "admin") {

                    const product = await Product.findByIdAndUpdate(req.params._id, req.body)

                    return res.send({ message: "token valid", result: "success" })

                }
                else {
                    return res.send({ result: "admin not found", user })
                }

            }
        })
        //  return res.send(product)
    }

    catch (err) {
        return res.send(err.message)
    }

})

module.exports = router
