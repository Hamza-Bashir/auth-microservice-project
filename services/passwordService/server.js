require("dotenv").config()

const app = require("./app")

const http = require("http")

const server = http.createServer(app)



const startServer = ()=>{
    try {
     

        server.listen(process.env.PORT, ()=>{
            console.log("Server start successfully")
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()