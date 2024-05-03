const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.route.js');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();

const app = express();

console.log(__dirname);

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {

    console.log('Server is running on port 3000');

});

app.use('/api/user', userRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

mongoose.connect('mongodb+srv://harishanth:2001Hari@cluster0.dj8xyh3.mongodb.net/').then( () => {
    console.log("Connected to MongoDB")}
  ).catch((err) => {
    console.log("Error: ", err);
  });


module.exports = app;