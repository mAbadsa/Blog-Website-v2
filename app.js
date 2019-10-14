//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require('path');
const _ = require('lodash');
const Blog = require('./modules/blog');
require('./mongoose/mongoose');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const publicPathDir = path.join(__dirname, 'public');
const viewsPathDir = path.join(__dirname, 'views');

app.set('view engine', 'ejs');
app.set('views', viewsPathDir);
app.use(express.static(publicPathDir));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', async (req, res) => {
  const posts = await Blog.find({});
  
  res.render('home', {
    title: "Home",
    homeStartingContent: homeStartingContent,
    posts: posts
  });
  console.log(posts);
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About",
    startingContent: aboutContent
  })
})

app.get('/contact', (req, res) => {
  res.render('about', {
    title: "Contact",
    startingContent: contactContent
  })
})

app.get('/compose', (req, res) => {
  res.render('compose', {
    title: "Compose"
  })
})

app.post('/compose', async (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }

  if(req.body.postTitle !== "" && req.body.postBody !== "") {
    // posts.push(post);
    const newPost = new Blog(post);
    try {
      await newPost.save();      
      res.redirect('/');
    } catch (error) {
      console.log(error);
    }
  } else {
    res.redirect('/compose');
  }
})

// app.get('/posts/:postName', async (req, res) => {
//   const posts = await Blog.find({});
//   let reqPostName = _.lowerCase(req.params.postName);
//   posts.forEach(post => {
//     let postTitle = _.lowerCase(post.title);

//     if(postTitle === reqPostName) {
//       res.render('post', {post: post});
//     }
//   })
// })

app.get('/posts/:postId', async (req, res) => {
  let reqPostId = req.params.postId;
  const post = await Blog.findOne({_id: reqPostId});
  // let postId = post._id;
  res.render('post', {post: post});
})

// app.post('/posts/:postId', (req, res) => {
//     req.params.postId = post._id;
// })

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
