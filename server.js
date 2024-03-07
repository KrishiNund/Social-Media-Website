//importing necessary modules
const path = require("path");
const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const expressSession = require('express-session');
const { sign } = require("crypto");

//creating express application
const app = express();
const PORT = process.env.PORT || 8080;

//to parse form data correctly
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configure express to use express-session
app.use(
  expressSession({
    secret:'cst2120 secret',
    cookie:{maxAge:6000},
    resave:false,
    saveUninitialized:true
  })
);

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
const collection = database.collection("Example_Users");


app.post('/M00934333/validate-signup',validateSignup);

async function signup(userDetails){
  // console.log(req.body);
  //inserting user details in database
  const result = await collection.insertOne(userDetails);
  return result;
}

async function validateSignup(req, res){
  const username = req.body.username;
  // console.log(username);

  //checking if username is already taken
  const query = {username:username};
  const user = await collection.findOne(query);

  //if there is a user already with that username
  if (user) {
    res.status(409).send({message:"Username already taken"});
  }
  else{
    const result = await signup(req.body);
    console.log("Added successfully");
    res.status(201).send({message:"Signup successful!", data:result});
  }
}


//starting server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

