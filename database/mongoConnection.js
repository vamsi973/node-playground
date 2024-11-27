
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://vamsi:Iam1robot@vamsikrishna.g94v9.mongodb.net/?retryWrites=true&w=majority&appName=vamsikrishna";

let db;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        return new Promise(async (resolve, reject) => {
            await client.connect();
            let connection = await client.db("admin").command({ ping: 1 });
            db = connection;
            resolve(db)
        })

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}


const mongoConnection = async (req, res, next) => {
    if (!db) {
        console.log("connection creation needed");
        await client.connect();
        let connection = await client.db("admin").command({ ping: 1 });
        req.dbConnection = db = client;
        next()
    } else {
        console.log("utlizein connecion")
        req.dbConnection = db;
        next()
    }

};
module.exports = mongoConnection;