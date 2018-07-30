const express =  require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

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

app.post('/api/posts', (req,res,next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(postCreated =>{
    res.status(201).json({
      message: 'Posts added successfully',
      postId: postCreated._id
    });
  });
});

//Updating the post
app.put("/api/posts/:id", (req,res,next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post )
  .then(result => {
    console.log(result);
    res.status(200).json({message: 'Update successful'});
  });
})

app.get('/api/posts',(req,res,next) => {
  // const posts = [
  //   { id: 'ehwufhre362',
  //   title: 'First server=side post',
  //   content: 'This is coming from the server'
  //   },
  //   { id: 'ehwufhfy363',
  //   title: 'Second server=side post',
  //   content: 'This is coming from the server!'
  //   }
  // ];
  Post.find().then( documents => {
    res.status(200).json({
      message: " Posts fetched successfully!",
      posts: documents
    });
    });
});

app.delete("/api/posts/:id", (req,res,next) => {
  // console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  });
  res.status(200).json({message: 'Post deleted!'});
});

module.exports = app;


