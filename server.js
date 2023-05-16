const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const aws = require('aws-sdk');

let s3 = new aws.S3({
  uri: process.env.MONGO_URI
});

require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = s3.uri;
mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB database connection established successfully');
});

const familyRouter = require('./routes/families');
app.use('/families', familyRouter);

app.listen(PORT, ()=>{
    console.log('Server running on port', PORT)
})