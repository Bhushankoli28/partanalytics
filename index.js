// import express, { request } from 'express'
// import res from 'express/lib/response';



const User = require("./src/controller/user.controller")
const connect = require("./src/config/db");
const express = require("express");
// const { connect } = require("mongoose");

const port = process.env.PORT || 8080
const Product = require("./src/controller/product.controller")



const app = express()

app.use(express.json())

app.use("/users", User)
app.use("/product", Product)

app.get("", async (req, res) => {
    await res.send("hiii")
})

app.listen(port, async () => {
    try {
        await connect()

    }
    catch (err) {

        console.log(err)
    }

    console.log("Server is Running")
})