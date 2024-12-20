// default/thirdparty modules importing 
const express = require('express')
const engine = require('express-edge');
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');

let app = module.exports = express(); // server instance 

//custom modules 
const { mongoConnection, closeConnection } = require('./database/mongoConnection')
const { ObjectId } = require('mongodb');

process.env.mongoDBNAME = 'myValue';

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

//post page route
// app.get("/post/:id", async (req, res) => {
//     console.log(req.params);
//     let post = await req.dbConnection.db('node-blog').collection('posts').findOne({ _id: new ObjectId(req.params.id) });
//     console.log(post)
//     res.render('post', { post })
// })

app.get("/post/:id", async (req, res) => {
    console.log(req.params);
    let post = await req.dbConnection.db('node-blog').collection('posts').findOne({ _id: new ObjectId(req.params.id) });
    console.log(post)
    res.render('createpost', { post })
})

//creating new post 
app.get("/posts/create", (req, res) => {
    res.render('createpost', {
        post: {
            userName: '',
            title: '',
            description: '',
            content: ''
        }
    })
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
app.use('/', require('./routes/route'))
