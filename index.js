//basic routing system
const http = require('http'); // http -internal module
const common = require('./common.js');
const home = require('./baisc-routes/home.js');
const about = require('./baisc-routes/about.js');
const price = require('./baisc-routes/price.js');
const fs = require('fs');

const server = http.createServer(routeHandler);


server.listen(3400, "127.0.0.1", () => {
    console.log("port started at 3400")
});


function routeHandler(req, res) {
    let { method, url } = req;
    // fs.appendFile('log.txt', `method ${method} url : ${url}`)
    if (method == 'GET') {
        if (url == '/') {
            home(req, res);
        } else if (url == "/about") {
            about(req, res);
        } else if (url == "/prices") {
            price(req, res);
        }

    } else if (method == 'POST') {

        if (url == '/') {
            home(req, res);
        } else if (url == "/about") {
            let body = '';
            req.on("data", chunk => {
                console.log(chunk, 433)
                body += chunk;
            })


            req.on("end", () => {
                const constbody = JSON.parse(body);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    "success": true,
                    "message": 'about page post requested',
                    "data": constbody
                }))
            })
        } else if (url == "/prices") {
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
                    "message": 'price page post requested',
                    "data": constbody
                }))
            })
        }
    }
}