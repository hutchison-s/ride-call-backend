const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
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