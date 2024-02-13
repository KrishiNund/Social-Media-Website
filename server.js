const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/M00934333',express.static(path.join(__dirname)));

app.use((request, response) =>{
    response.status(404);
    const errorHTML = `<h1 style="text-align:center">Error 404: Resource Not Found</h1>`;
    response.send(errorHTML);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
