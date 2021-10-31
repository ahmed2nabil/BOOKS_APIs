//setup server 
var express = require('express');
var cors = require("cors");
var bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var app = express();
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;

//routes 
var storeRoute = require('./routes/storeRoute');
var bookRoute = require('./routes/bookRoute');
var userRoute = require('./routes/userRoute');
var loginRoute = require('./routes/loginRoute');
var uploadRoute = require('./routes/uploadRoute');
var exportRoute = require('./routes/exportRoute');
var paypalRoute = require('./routes/paypalRoute');


app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Expose the node_modules folder as static resources (to access socket.io.js in the browser)
app.use('/static', express.static('node_modules'));


app.get("/" , function(req , res) {
    // res.send("Server started ........");
    res.sendFile(__dirname + '/index.html')
});

app.get("/payment" , function(req , res) {
    // res.send("Server started ........");
    res.sendFile(__dirname + '/payment.html')
});

// success page 
app.get('/success' , (req ,res ) => { 
    res.sendFile(__dirname + '/success.html')
})
// error page 
app.get('/err' , (req , res) => {
    res.sendFile(__dirname + '/error.html')
})

app.use("/api/v1",storeRoute);
app.use("/api/v1",bookRoute);
app.use("/api/v1",userRoute);
app.use("/api/v1",loginRoute);
app.use("/api/v1",uploadRoute);
app.use("/api/v1",exportRoute);
app.use("/api/v1",paypalRoute);



const server = app.listen(PORT,()=> {
    console.log(`Server starts ... at PORT ${PORT}`)
})

// initialize & listen to server
const io = new Server(server);

io.on('connection', function (socket) {
    console.log("Connected successfully to the socket ...");
    
    setInterval(function(){
        var news = getNews();
        // Send news on the socket
        socket.emit('news', news);
    } , 5000);
    socket.on('my other event', function (data) {
        console.log(data);
    });
});


function getNews(){
    var length = Math.floor(Math.random() * 21);
    var news = [];
    for(var i = 0; i < length ; i++ ){
        var val = {id : i , title : 'The cure of the Sadness is to play Videogames' + i , date: new Date() }
        news.push(val);
    }
    return news
}
module.exports = app 