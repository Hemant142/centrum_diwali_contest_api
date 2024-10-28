const express = require("express")
require("dotenv").config();
const cors = require("cors");

const Port = process.env.PORT || 8000
const connection = require('./Config/db')
const {userRouter} =require("./Routers/UserRouter");
const { questionRouter } = require("./Routers/QuestionsRouter");
const app = express();
app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use("/questions",questionRouter)

app.get("/",(req,res)=>{
    res.status(200).send({message:"Welcome to the backend od Diwali Contest"})
})


app.listen(Port,async()=>{
    try{
        await connection
        console.log("Server is connected to DB")
        console.log(`App is listening to the port ${Port}`)
    }catch(error){
        console.log(error)
    } 
})