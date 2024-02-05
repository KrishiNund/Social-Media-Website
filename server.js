//? Creating the server
//importing express module

import express from 'express';

//creates web server
const app = express();

function handleGetRequest(request, response){
    //sends the text Hello Sam to the user's browser
    response.send('Hello Sam');
}

//defining a route for GET requests to the path /kitty
//when a user visits http://localhost:8080/kitty, the code within the function gets executed
app.get('/M00934333/', handleGetRequest);

//defines a route for POST request to path /kitty
app.post('/kitty',(request,response)=>{
    //post requests are used to submit data to the server, often forms
    response.send('Bye Sam');
});

app.listen(8080);
console.log("Express listening on port 8080.");