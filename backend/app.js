const express =  require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path =require('path');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

// Connecting to the database

// mongoose.connect('mongodb://localhost/meanproj')
mongoose.connect('mongodb+srv://Harshilpk:' + process.env.MONGO_ATLAS_PW + '@cluster0-mxuat.mongodb.net/test?')
.then(() => {
  console.log('Connected to database successfully!!')
})
.catch((error) => {
  console.log("Failed to connect to Database!!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/images", express.static(path.join("images")));

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
  next();
});

app.use("/api/posts/", postsRoutes);
app.use("/api/user", userRoutes);


module.exports = app;


