const connectDB = require('./config/db');
const express = require('express');
const app= express();
const dotenv= require('dotenv');

dotenv.config('./.env');

app.get('/', (req, res)=>{
    res.send("Api is Working");
})

connectDB();

const Port= process.env.PORT;

app.listen(Port,()=>{
    console.log(`App is Running on the port: ${Port}`)
})

