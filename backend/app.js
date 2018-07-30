const express =  require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

const app = express();

// Connecting to the database

mongoose.connect('mongodb://localhost/meanproj')
.then(() => {
  console.log('Connected to database successfully!!')
})
.catch((error) => {
  console.log("Failed to connect to Database!!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
  next();
});

app.use("/api/posts/", postsRoutes);


module.exports = app;


