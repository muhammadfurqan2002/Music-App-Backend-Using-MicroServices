import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import express from 'express';
import userRoutes from './route.js'

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())

console.log("MONGO_URI is:", process.env.MONGO_URI);

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI as string,{
            dbName:"spotify"
        })
        console.log("Mongo Db Connected")
    }catch(e){
        console.log(e);
    }
}



app.use("/api/v1",userRoutes);

app.get("/",(req,res)=>{
    res.send("Server is working")
})


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
    connectDB();
});
