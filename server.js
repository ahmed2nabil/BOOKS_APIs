//setup server 
var express = require('express');
var cors = require("cors");
var bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var app = express();

const PORT = process.env.PORT || 3000;

//routes 
var storeRoute = require('./routes/storeRoute');
var bookRoute = require('./routes/bookRoute');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1",storeRoute);
app.use("/api/v1",bookRoute);

app.listen(PORT,()=> {
    console.log(`Server starts ... at PORT ${PORT}`)
})