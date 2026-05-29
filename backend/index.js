const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const connectDB = require('./config/db');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

connectDB();

app.get('/',(req,res)=>{
    res.send("Hello World");
})
app.use('/api/auth',require('./routes/authroutes'));
app.use('/api/products',require('./routes/productRoutes'));
app.use('/api/orders',require('./routes/orderRoutes'));
//app.use('/api/payment',require('./routes/paymentRoutes'));
app.use('/api/analytics',require('./routes/analyticsRoutes'));

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log('server has started'); 
});
