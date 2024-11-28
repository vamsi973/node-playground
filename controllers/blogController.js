const path = require('path');
const blog = {
    posts: (req, res) => {

    },
    createPost: async (req, res) => {
        console.log("creating post", req.body, 8999);
        let { image } = req.files;
        let { username: userName, title, description, content, createdAt = new Date() } = req.body;
        image.mv(path.resolve(__dirname, 'public/posts', image.name), async (err, data) => {
            let insertedRecord = await req.dbConnection.db('node-blog').collection("posts").insertOne({ userName, title, description, content, path: `posts/${image.name}`, createdAt });
            console.log(insertedRecord)
            if (insertedRecord.acknowledged && insertedRecord.insertedId) {
                return res.redirect('/')

            }
            res.send("unable to update")
        })


    },
    editPost: (req, res) => {

    },
    deletePost: (req, res) => {


    },
    getSinglePost: (req, res) => {

    },
}
module.exports = blog;