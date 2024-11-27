const fs = require('fs');
const path = require('path');
module.exports = (req, res) => {
    if (req.method == "GET") {
        // res.writeHead(200, { "Content-Type": "application/json" }),
        //     res.end(JSON.stringify({
        //         "success": true,
        //         "message": 'home page requested'
        //     }))


        res.writeHead(200, { "Content-Type": "text/html" });
        console.log(__dirname,900);
        res.end(fs.readFileSync(path.join(__dirname,'../basic-public/index.html'),'utf8'));

    } else if (req.method == 'POST') {
        let body = '';
        req.on("data", chunk => {
            console.log(chunk, 33)
            body += chunk;
        })
        console.log(body, 33);

        req.on("end", () => {
            const constbody = JSON.parse(body);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                "success": true,
                "message": 'home page post requested',
                "data": constbody
            }))
        })
    }
}
