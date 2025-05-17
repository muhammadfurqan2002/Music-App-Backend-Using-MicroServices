import dotenv from "dotenv";
dotenv.config();
import express from "express";
import songRoutes from './route.js'
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

const app = express();
app.use("/api/v1",songRoutes)
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is runnig on ${port}`);
});
