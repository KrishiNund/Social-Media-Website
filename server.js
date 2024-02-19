//importing necessary modules
const path = require('path');
const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');

//creating express application
const app = express();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());

//connection details
const password ="M00934333+2023";
const username ="Nund";
const server = "clusterm00934333.pwixe8b.mongodb.net";

//encoding special characters
const encodedUsername = encodeURIComponent(username);
const encodedPassword = encodeURIComponent(password);

//creating mongodb connection uri
const uri = `mongodb+srv://${encodedUsername}:${encodedPassword}@${server}/?retryWrites=true&w=majority`;

//creating client instance
const client =new mongodb.MongoClient(uri,{ 
    serverApi: {
        version: mongodb.ServerApiVersion.v1,
        strict:false,
        deprecationErrors:true,
    }
});

//creating mongodb connect function
async function connectToMongoDB(){
    try
    {
        await client.connect();
        console.log("Sucessfully connected to MongoDB");
    }
    catch(error)
    {
        console.error("Error connecting to MongoDB:", error);
        return;
    }
}

//try to establisj connection to mongodb
connectToMongoDB();

app.use('/',express.static(path.join(__dirname)));


const database = client.db("Social_Media_Website");
const collection = database.collection("Example_Users");

app.post('/M00934333',async(req,res)=>{
    const userData = {
        ID: 'M00934333',
        firstName: 'Omkaar Krishi',
        lastName: 'Nund',
        email: 'ON144@live.mdx.ac.uk'
        
    };

    const result = await collection.insertOne(userData);
        
    console.log(result);

    res.send("Data Received successfully");
});
    
app.get('/M00934333',async (req,res)=>{

    const query = {};

    const results = await collection.find(query).toArray();

    res.setHeader('Content-Type','application/json');

    res.send(JSON.stringify(results));
    
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
