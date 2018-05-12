const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const path = require('path');
const router = require('./routes/get');

app.use(router);
app.use(express.static(path.join(__dirname,'/public')));

app.listen(port,() =>{
    console.log("Server is running on port"+port);
})
