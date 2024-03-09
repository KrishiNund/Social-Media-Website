//importing necessary modules
const path = require("path");
const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const session = require('express-session');
const {check, validationResult} = require('express-validator');
const { sign } = require("crypto");

//creating express application
const app = express();
const PORT = process.env.PORT || 8080;

//configure express to use express-session
app.use(
  session({
    secret:'cst2120 secret',
    cookie:{maxAge:360000},
    resave:false,
    saveUninitialized:false,
  })
);
//to parse form data correctly
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.use("/", express.static(path.join(__dirname)));

const database = client.db("Social_Media_Website");
// const collection = database.collection("Example_Users");


app.post('/M00934333/validate-signup',[
  check('fullName').notEmpty().withMessage('Name cannot be blank').matches(/^[A-Za-z\s]+$/).withMessage('Name cannot contain digits'),
  check('username').notEmpty().withMessage('Username cannot be blank').isLength({max:8}).withMessage('Max Username Length is 8'),
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({min:6}).withMessage('Password must contain at least 6 characters'),
  check('gender').isIn(['male','female','other']).withMessage('Invalid Gender'),
  check('dob').isISO8601().withMessage('Invalid Date format')
],validateSignup);

async function signup(userDetails){
  const collection = database.collection("Users");
  // console.log(req.body);
  //inserting user details in database
  const result = await collection.insertOne(userDetails);

  const insertedUserId = result.insertedId;

  collection.updateOne(
    {_id:insertedUserId},
    {
      $set:{
        followers:[],
        following:[],
      }
    }
  )
  return result;
}

async function validateSignup(req, res){
  const collection = database.collection("Users");
  const errors = validationResult(req);
  const username = req.body.username;
  // console.log(username);

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

async function validateLogin(req, res){
  const collection = database.collection("Users");
  const username = req.body.username;
  const password = req.body.password;
  
  //checking if username and password match a user in database
  const query = {username:username,password:password};
  const user = await collection.findOne(query);
  console.log(user);

  //if there is a user with those credentials
  if (user) {
    // console.log("here");
    res.status(201).send({message:"User found",data:user.username});
    // req.session.username = username;
    // console.log(username);
    // console.log(req.session.username);
  }
  else{
    res.status(404).send({message:"User not found"});
  }
}

// app.get('/M00934333/logout',logOut);

// function logOut(req,res){
//   // console.log(req.session.username);
//   // console.log("here");
//   req.session.destroy((err)=>{
//     if(err){
//       res.status(404).send({message:"Oops...Something went wrong!"});
//     } else {
//       res.status(201).send({message:"Log out successful"});
//     }
//   })
// }

app.post('/M00934333/create-post',storePost);

async function storePost(req,res){
  const collection = database.collection("Posts");
  const postDetails = req.body;
  const result = await collection.insertOne(postDetails);

  res.status(201).send({message:"Post Created Successfully", data: result});
}
//starting server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

