const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user');

//middleware
app.use(express.json());
app.use(cors());
app.use('/user',userRoutes)

//connecting mongodb
mongoose.connect(process.env.MONGODB).then(() =>{
    console.log(`MONGODB Connected Successfully`);
    app.listen(process.env.PORT,()=>{
        console.log(`server is running on port ${process.env.PORT}`)
    }
    )
}).catch(err => {
    console.log(`MONGODB not connected - ${err}`);
})

