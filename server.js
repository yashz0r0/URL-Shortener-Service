const connectDB = require('./config/db');
const express = require('express');
const dotenv= require('dotenv');
const urlRoutes= require('./routes/urls');



const app= express();
dotenv.config('./.env');
connectDB();

app.use(express.json({ type: ['application/json', 'text/plain'] }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.send("Api is Working");
})

app.use('/api',urlRoutes);


const Port= process.env.PORT;

app.listen(Port,()=>{
    console.log(`App is Running on the port: ${Port}`)
})

