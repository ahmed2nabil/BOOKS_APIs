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
var userRoute = require('./routes/userRoute');
var loginRoute = require('./routes/loginRoute');
var uploadRoute = require('./routes/uploadRoute');
var exportRoute = require('./routes/exportRoute');



app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1",storeRoute);
app.use("/api/v1",bookRoute);
app.use("/api/v1",userRoute);
app.use("/api/v1",loginRoute);
app.use("/api/v1",uploadRoute);
app.use("/api/v1",exportRoute);



app.listen(PORT,()=> {
    console.log(`Server starts ... at PORT ${PORT}`)
})

module.exports = app 