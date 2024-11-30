
const blogController = {
    contactFormSubmit: async (req, res) => {
        console.log("contact form");
        let insertedRecord = await req.dbConnection.db('node-blog').collection("contact").insertOne(req.body);
        res.redirect('/')
    }
};

module.exports = blogController;
