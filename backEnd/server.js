const app = require("./app")
require('dotenv').config({ path : "backEnd/config/config.env"})
const connectToDB = require("./config/dbConfig")

// handling Uncaught errors
process.on("uncaughtException" , (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server , Due to Uncaught error rejection`)
    process.exit(1)
})

// Connecting to DB
connectToDB()



const server = app.listen(process.env.PORT , () => {
    console.log(`server is listening on http://localhost:${process.env.PORT}`)
})

// Unhandled Promise rejection 
process.on("unhandledRejection" , err => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server , Due to unhandled Promise rejection`)

    server.close( () => {
        process.exit(1)
    } )

})