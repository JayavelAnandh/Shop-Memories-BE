import express from 'express';
import { ShoppingRoutes } from './routes/ShoppingRoutes.js';
import cors from 'cors';    
import dotenv from 'dotenv';
import { dataBaseConnection } from './db.js';

const app = express();
dotenv.config();
dataBaseConnection();
app.get("/",(req,res)=>{
    res.send("Working Fine")
})
app.use(cors());
app.use(express.json());

app.use("/shop",ShoppingRoutes);

app.listen(process.env.PORT);