import express, { Router } from "express";
import mongoose from "mongoose";
import cors from "cors"
import bodyParser from "body-parser";
import * as dotenv from 'dotenv' 
import AuthRoutes from "./routes/Auth.js";
import UserRoutes from "./routes/userRoutes.js";
import PostRoutes from "./routes/PostRoutes.js"

dotenv.config()
const app =express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(process.env.DB).then(
app.listen(process.env.PORT,()=>{
    console.log( `Server is running on ${process.env.PORT}`)
}))

app.use("/auth",AuthRoutes)
app.use("/user",UserRoutes)
app.use("/post",PostRoutes)



