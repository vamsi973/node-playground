// default/thirdparty modules importing 
const express = require('express')
const engine = require('express-edge');
const fs = require('fs');
const path = require('path');
// const fileUpload = require('express-fileupload');

let app = module.exports = express(); // server instance 

//custom modules 
const { mongoConnection, closeConnection } = require('./database/mongoConnection')
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
    let posts = await req.dbConnection.db('node-blog').collection('posts').find({}).toArray();
    console.log(posts)
    res.render("index", {
        posts
    });
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
app.post('/help', async (req, res) => {
    console.log("help request recevied");
    console.log("help request recevied with", req.body);
    let insertedRecord = await req.dbConnection.db('node-blog').collection("contact").insertOne(req.body);
    res.redirect('/')
});


app.post('/insertContent', async (req, res) => {
    console.log(req.body, 8999);
    let { username: userName, title, description, content, createdAt = new Date() } = req.body;
    let insertedRecord = await req.dbConnection.db('node-blog').collection("posts").insertOne({ userName, title, description, content, createdAt });
    console.log(insertedRecord)
    if (insertedRecord.acknowledged && insertedRecord.insertedId) {
        // return res.redirect('/')
        return res.send("success")
    }
    res.send("unable to update")
})


// server start listening
app.listen(3500, () => console.log("server started and listend at 3500"));


process.on('SIGINT', () => {
    console.log(" closeing node port");
    process.exit(0); 
});
process.on('beforeExit', (code) => {
    console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
    closeConnection()
    console.log('Process exit event with code: ', code);

});
process.on('uncaughtException', (err) => console.log(err));