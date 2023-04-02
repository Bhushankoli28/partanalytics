

const jwt = require("jsonwebtoken")

const secretkey = "koli"

const express = require("express");

const User = require("../models/user.model");


const router = express();

router.post("/signin", async (req, res) => {

    try {
        if (req.body.role === "admin" || "user") {
            if (req.body.password === req.body.confirm_password) {
                const user = await User.create(req.body)

                return res.send({
                    status: "Success"
                })

            }
            else {
                return res.send({ error: "password didn't match with confirm_password " })
            }
        }
        else {
            return res.send({ error: "role should have admin or user" })
        }


    }
    catch (err) {

        return res.send(err.message)
    }


})

router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({
            email: req.body.email
        })

        if (user) {

            const check = req.body.password === user.password
            if (check) {
                const data = { email: user.email, password: user.password }
                jwt.sign({ data }, secretkey, { expiresIn: "1000s" }, (err, token) => {

                    return res.json({ tokendata: token })
                })


            }
            else {
                return res.send({ error: "wrong password" })
            }


        }
        else { return res.send({ error: "user doesn't exist" }) }

        // return res.send({
        //     status: "Success"
        // })


    }
    catch (err) {

        return res.send(err.message)
    }


})



module.exports = router;



