//importing necessary modules
const path = require("path");
const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const session = require('express-session');
const {check, validationResult} = require('express-validator');
const multer = require('multer');
// const { sign } = require("crypto");


//creating express application
const app = express();
const PORT = process.env.PORT || 8080;

app.use("/", express.static(path.join(__dirname)));

//configure express to use express-session
app.use(
  session({
    secret:'cst2120 secret',
    cookie:{maxAge:3600000},
    resave:false,
    saveUninitialized:false
  })
);

//to parse form data correctly
app.use(bodyParser.urlencoded({ extended: true, limit:'100mb' }));
app.use(bodyParser.json({limit:'100mb'}));

//connection details
const password = "M00934333+2023";
const username = "Nund";
const server = "clusterm00934333.pwixe8b.mongodb.net";

//encoding special characters
const encodedUsername = encodeURIComponent(username);
const encodedPassword = encodeURIComponent(password);

//creating mongodb connection uri
const uri = `mongodb+srv://${encodedUsername}:${encodedPassword}@${server}/?retryWrites=true&w=majority`;

//creating client instance
const client = new mongodb.MongoClient(uri, {
  serverApi: {
    version: mongodb.ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

//creating a storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, './uploads');
  },
  filename: function (req, file, cb){
    cb(null, Date.now()+ '-' + file.originalname);
  },
});

//initializing multer
const mediaUpload = multer({
  storage:storage,
  limits:{fileSize: 100 * 1024 * 1024},
}).single('mediaUpload');


//creating mongodb connect function
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Sucessfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return;
  }
}

//try to establish connection to mongodb
connectToMongoDB();

//sepcifying default database
const database = client.db("Social_Media_Website");

//validate sign up details
app.post('/M00934333/validate-signup',[
  check('fullName').notEmpty().withMessage('Name cannot be blank').matches(/^[A-Za-z\s]+$/).withMessage('Name cannot contain digits'),
  check('username').notEmpty().withMessage('Username cannot be blank').isLength({max:8}).withMessage('Max Username Length is 8'),
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({min:6}).withMessage('Password must contain at least 6 characters'),
  check('gender').isIn(['male','female','other']).withMessage('Invalid Gender'),
  check('dob').isISO8601().withMessage('Invalid Date format')
],validateSignup);

//add user details to Users collection
async function signup(userDetails){
  const collection = database.collection("Users");
  
  //inserting user details in database
  const result = await collection.insertOne(userDetails);

  const insertedUserId = result.insertedId;

  collection.updateOne(
    {_id:insertedUserId},
    {
      $set:{
        following:[]
      }
    }
  )
  return result;
}

//check user details before adding to mongodb database
async function validateSignup(req, res){
  const collection = database.collection("Users");
  const errors = validationResult(req);
  const username = req.body.username;
 

  //checking if username is already taken
  const query = {username:username};
  const user = await collection.findOne(query);

  //if there is a user already with that username
  if (user) {
    res.status(409).send({message:"Username already taken"});
  }
  else if (!errors.isEmpty()){
    const errorMessages = errors.array().map(error => error.msg);
    res.status(400).send({message:"Error List", data: errorMessages});
  }
  else {
    const result = await signup(req.body);
    console.log("Added successfully");
    res.status(201).send({message:"Signup successful!", data:result});
  }
}

app.post('/M00934333/validate-login', validateLogin);

//authenticate login details
async function validateLogin(req, res){
  const collection = database.collection("Users");
  const username = req.body.username;
  const password = req.body.password;
  
  //checking if username and password match a user in database
  const query = {username:username,password:password};
  const user = await collection.findOne(query);
  // console.log(user);

  //if there is a user with those credentials
  if (user) {
    req.session.username = username;
    // req.session.save();
    res.status(201).send({message:"User found",data:req.session.username});
  }
  else{
    res.status(404).send({message:"User not found"});
  }
}

app.post('/M00934333/create-post',mediaUpload, storePost);

//store details of post
async function storePost(req,res){
  // console.log(req.file.path);
  if (!req.session.username){
    res.status(404).send({message:"User is not logged in"});
  } else {
    const collection = database.collection("Posts");

    try{
      const postDetails = {
        user: req.session.username,
        text: req.body.text,
        likes: [],
        dislikes: [],
        media: req.file ? req.file.path : null,
      };

      const result = await collection.insertOne(postDetails);

      res.status(201).send({message:"Post Created Successfully", data: result});
    } catch (err){
      console.log(err);
      res.status(500).send({message:"Internal Server error"});

    } 
  }
}

app.get('/M00934333/logout',logout);

async function logout(req,res){
  if (!req.session.username){
    res.status(404).send({message:"Already logged out"});
  } else {
    req.session.destroy();
    res.status(201).send({message:"Log Out Successful"});
  }
}

app.get('/M00934333/get-all-posts', getAllPosts);

async function getAllPosts(req,res){
  const collection = database.collection("Posts");
  const posts = await collection.find({}).toArray();
  // console.log(posts);
  res.status(201).send({message:"Posts Successfully Retrieved",data:posts});
}


app.get('/M00934333/get-status',getUserStatus);

async function getUserStatus(req,res){
  const username = req.session.username;
  if (!username){
    res.send({message:"Logged Out",data:"None"});
  } else {
    res.send({message:"Logged In",data:username});
  }
  
}

//follow a user
app.post('/M00934333/follow-user',followUser);

async function followUser(req,res){

  try{
    const username = req.body.username;
    console.log("username:",username);
    console.log("session:",req.session.username);
    if (!req.session.username){
      res.status(404).send({message:"Not logged in"});

    } else if (username === req.session.username){
      res.status(404).send({message:"Cannot follow yourself"});

    } else {
      const collection = database.collection("Users");

      const result = await collection.updateOne({username:req.session.username},{$addToSet:{following:req.body}});

      res.status(201).send({message:"Successfully followed user",data:result});
    }
  } catch(error){
    res.status(404).send({message:"Couldn't follow user"});
  }
}

//return list of following users
app.get('/M00934333/get-following',getFollowing);

async function getFollowing(req,res){
  try{
    const collection = database.collection("Users");
    const loggedInUser = req.session.username;
    const query = {username:loggedInUser};
    // const projection = {following:1};
  
    const result = await collection.findOne(query);
    // console.log(result.following);
    res.status(201).send({message:"Following list",data:result.following}); 
  } catch(error){
    res.status(404).send({message:"Not logged in"}); 
  }
  
}

//unfollow user
app.post('/M00934333/unfollow-user',unfollowUser);

async function unfollowUser(req,res){
  try{
    const username = req.body.username;
    console.log("username:",username);
    console.log("session:",req.session.username);
    
    const collection = database.collection("Users");

    const result = await collection.updateOne({username:req.session.username},{$pull:{following:req.body}});

    res.status(201).send({message:"Successfully unfollowed user",data:result});
    
  } catch(error){
    res.status(404).send({message:"Couldn't unfollow user"});
  }
}

//starting server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


