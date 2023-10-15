const express = require("express")
const app = express()
const errorMiddleware = require("./middlewares/error")

app.use(express.json())


// Router imports here

const products = require("./routes/productRoute")
app.use("/api" , products)


// Middleware for errors
app.use(errorMiddleware)

module.exports = app