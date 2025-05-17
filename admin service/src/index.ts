import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import {sql} from './config/db.js'
import adminRoutes from './route.js'
import cloudinary from 'cloudinary'
import redis from 'redis';

export const redisClient=redis.createClient({
  password:process.env.REDIS_PASSWORD,
  socket:{
    host:"redis-11942.c301.ap-south-1-1.ec2.redns.redis-cloud.com",
    port:11942
  }
})

redisClient.connect().then(()=>{
  console.log("Connected to Redis")
}).catch((error)=>{
  console.log(error)
})


const app=express()

app.use(express.json())
cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name as string,
    api_key: process.env.Cloud_Api_Key as string,
    api_secret: process.env.Cloud_Api_Secret as string
})

app.use("/api/v1",adminRoutes)




async function initDB() {
    try {
        await sql `
        CREATE TABLE IF NOT EXISTS albums(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `
        await sql `
        CREATE TABLE IF NOT EXISTS songs(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255),
            audio VARCHAR(255) NOT NULL,
            album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `

        console.log("Database initialized successfully");
    } catch (error) {
        console.log("Error initDb",error)
    }
}

const port=process.env.PORT||7000


initDB().then((result) => {
    app.listen(port,()=>{
        console.log(`Server Running Port ${port}`)
    })    
})