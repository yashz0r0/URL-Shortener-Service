const connectDB = require('./config/db');
const express = require('express');
const dotenv= require('dotenv');
const urlRoutes= require('./routes/urls');
const redirectRoutes= require('./routes/index');


const app= express();
dotenv.config('./.env');
connectDB();


app.use(express.json({ type: ['application/json', 'text/plain'] }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the URL Shortener API',
    });
});
app.use('/api',urlRoutes);
app.use('/', redirectRoutes);



const Port= process.env.PORT;

app.listen(Port,()=>{
    console.log(`App is Running on the port: ${Port}`)
})

