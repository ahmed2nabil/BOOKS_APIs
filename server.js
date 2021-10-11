//setup server 
var express = require('express');
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 3000;

//routes 
var storeRoute = require('./routes/storeRoute');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use("/api/v1",storeRoute);

app.get("/",(req,res) => {
res.send("HELLO REVISION")
});

app.listen(PORT,()=> {
    console.log(`Server starts ... at PORT ${PORT}`)
})