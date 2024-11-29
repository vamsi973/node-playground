// default/thirdparty modules importing 
const express = require('express')
const engine = require('express-edge');
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');

let app = module.exports = express(); // server instance 

//custom modules 
const mongoConnection = require('./database/mongoConnection');
const { ObjectId } = require('mongodb');
// console.log(db())

//middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(engine);
app.use(mongoConnection);
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, //file size is limited to 50 mb
}));

// setting variables 
app.set('views', `${__dirname}/views`);


//----------routes creating-------------------------------
// home page route--------------------------
app.get("/", async (req, res) => {
    let posts = await req.dbConnection.db('node-blog').collection('posts').find({}).toArray();
    res.render("index", {
        posts
    });
})

// About page---********************.-----------
app.get("/about", (req, res) => {
    res.render('about')
})
//post page route
app.get("/post/:id", async (req, res) => {
    console.log(req.params);
    let post = await req.dbConnection.db('node-blog').collection('posts').findOne({ _id: new ObjectId(req.params.id) });
    console.log(post)
    res.render('post', { post })
})

//creating new post 
app.get("/posts/create", (req, res) => {
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

    let { username: userName, title, description, content, createdAt = new Date() } = req.body;
    let { image } = req.files;

    image.mv(path.resolve(__dirname, "public/posts", image.name), async (err, result) => {
        // console.log(result);
        // console.log(err);
        let insertedRecord = await req.dbConnection.db('node-blog').collection("posts").insertOne({ userName, title, description, content, image: `/posts/${image.name}`, createdAt });
        console.log(insertedRecord)
        if (insertedRecord.acknowledged && insertedRecord.insertedId) {
            // return res.redirect('/')
            return res.send("success")
        }
    })


    // res.send("unable to update")
})


// server start listening
app.listen(3500, () => console.log("server started and listend at 3500"));