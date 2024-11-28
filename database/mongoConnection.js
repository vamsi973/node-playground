
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://vamsi:Iam1robot@vamsikrishna.g94v9.mongodb.net/?retryWrites=true&w=majority&appName=vamsikrishna";

let db; //variable declare
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const mongoConnection = async (req, res, next) => {
    // console.log(req.method,req.url)
    if (!db) {
        console.log("connection creation needed");
        await client.connect();
        // let connection = await client.db("admin").command({ ping: 1 });
        req.dbConnection = db = client;
        next()
    } else {
        console.log("utlizein connecion")
        req.dbConnection = db;
        next()
    }

};
module.exports.mongoConnection = mongoConnection;

module.exports.closeConnection = () => {    
    console.log("closing opened db connections");
    db.close();
}