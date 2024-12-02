const crypto = require('crypto');
const blogController = {
    contactFormSubmit: async (req, res) => {
        console.log("contact form");
        let insertedRecord = await req.dbConnection.db('node-blog').collection("contact").insertOne(req.body);
        res.redirect('/')
    },
    postBlog: async (req, res) => {
        if (!req.files) {
            let { username: userName, title, description, content, createdAt = new Date() } = req.body;
            let insertedRecord = await req.dbConnection.db('node-blog').collection("posts").insertOne({ userName, title, description, content, createdAt });
            console.log(insertedRecord)
            if (insertedRecord.acknowledged && insertedRecord.insertedId) {
                return res.redirect('/')
            }
            return res.send("unable to update")
        }
        image.mv(path.resolve(__dirname, "public/posts", image.name), async (err, result) => {
            // console.log(result);
            // console.log(err);
            let insertedRecord = await req.dbConnection.db('node-blog').collection("posts").insertOne({ userName, title, description, content, image: `/posts/${image.name}`, createdAt });
            console.log(insertedRecord)
            if (insertedRecord.acknowledged && insertedRecord.insertedId) {
                return res.redirect('/')
            }
        })
    },
    update: async (req, res) => {

    },

    createUser: async (req, res) => {
        try {
            const secret = "secret";
            const hash = crypto.createHmac('sha256', secret)
                .update(req.body.password)
                .digest('hex');
            console.log(hash)


            let data = await req.dbConnection.db('node-blog').collection("users").insertOne({ userName: req.body.userName, password: hash, createdAt: new Date() });
            res.send(data)
        } catch (error) {
            console.log(error);
            res.send("failed")
        }
    }
};

module.exports = blogController;
