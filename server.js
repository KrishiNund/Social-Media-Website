//importing necessary modules
const path = require("path");
const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const expressSession = require('express-session');

//creating express application
const app = express();
const PORT = process.env.PORT || 8080;
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

//set up application to handle get requests
// app.get('/M00934333/users', getUsers);

async function getUsers(){
  const query = {};

  const results = await collection.find(query).toArray();

  return results;
 
}

async function fetchData(){
  const results = await getUsers();
  console.log(results);

  for (const result of results){
    console.log(result.firstName);
  }

  console.log(results[0].firstName);
}

fetchData();


// app.get('/M00934333/checklogin', checkLogin);
// app.get('/M00934333/logout', logout);


//set up application to handle post requests
// app.post('/M00934333/login',login);
// app.post('/M00934333/register',register);














//post request
app.post("/M00934333", async (req, res) => {
  const userData = {
    ID: "M00934333",
    firstName: "Omkaar Krishi",
    lastName: "Nund",
    email: "ON144@live.mdx.ac.uk",
  };

  const result = await collection.insertOne(userData);

  res.send(`Data Received successfully: ${JSON.stringify(result)}`);
});


//get request
// app.get("/M00934333", async (req, res) => {
//   const query = {};

//   const results = await collection.find(query).toArray();

//   res.setHeader("Content-Type", "application/json");

//   res.send(JSON.stringify(results));
// });

//starting server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
