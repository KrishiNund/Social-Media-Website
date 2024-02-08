// import express from 'express';
// import fs from 'fs';
// import path from 'path';
const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('images'));
function handleGetRequest(request,response){
    const filePath = path.join(__dirname,'index.html')
    fs.readFile(filePath,'utf8',(error,data) => {
        if(error){
            throw error;
            // response.status(500).send('Error reading this html file!');
            // return;
        }

        response.send(data);
    });
}

app.get('/',handleGetRequest);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
