// default/thirdparty modules importing 
const express = require('express')
const engine = require('express-edge');
const fs = require('fs');
const path = require('path');
// const fileUpload = require('express-fileupload');

let app = module.exports = express(); // server instance 

//custom modules 
const mongoConnection = require('./database/mongoConnection')
// console.log(db())

//middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(engine);
app.use(mongoConnection)

// setting variables 
app.set('views', `${__dirname}/views`);


//----------routes creating-------------------------------
// home page route--------------------------
app.get("/", async (req, res) => {
    let data = await req.dbConnection.db('test').collection('posts').find({}).toArray();
    console.log(data)
    res.render("index");
})

// About page---********************.-----------
app.get("/about", (req, res) => {
    res.render('about')
})
//post page route
app.get("/post", (req, res) => {
    res.render('post')
})

//creating new post 
app.get("/post/create", (req, res) => {
    res.render('createpost')
})


//contact page route
app.get("/contact", (req, res) => {
    res.render('contact')
})

//contact help form route
app.post('/help', (req, res) => {
    console.log("help request recevied");
    console.log("help request recevied with", req.body);
})

app.post('/', (req, res) => {
    res.send("post request handlere")
})





// server start listening
app.listen(3500, () => console.log("server started and listend at 3500"));