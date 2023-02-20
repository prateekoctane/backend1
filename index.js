const express = require("express");
const { connection } = require("./config/db");
require("dotenv").config();
const cors = require("cors")
const {userRouter } = require("./routes/users.route")


const app  = express();
app.use(express.json())
app.use(cors())
app.use("/user",userRouter)




app.listen(process.env.port,async()=>{

    try{
        await connection;
        console.log("connected to database")
    }catch(err){
        console.log({"msg":"cannot connect to database","error":err.message})
    }
    console.log("server started")
})