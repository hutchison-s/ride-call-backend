const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());


mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB database connection established successfully');
});

const familyRouter = require('./routes/families');
app.use('/families', familyRouter);

app.listen(port, ()=>{
    console.log('Server running on port', port)
})
