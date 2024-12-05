// spawn, exe ,execfile, fork

const child = require('child_process');
const express = require('express');
const app = express();
const port = 5200;
app.listen(port, () => console.log(`server starts at ${process.pid} and port is ${port}`));

app.get("/timepass", (req, res) => {
    let sum = timePassFun();
    res.send({ sum: sum })
});

app.get("/timepass2", async (req, res) => {
    let sum = await longWorker();
    res.send({ sum: sum })
});

app.get('/timepass3', (req, res) => {

    let ch = child.fork('./worker.js');
    ch.send('init');
    ch.on('message', (value) => {
        res.send({ sum: value })
    })
})


function timePassFun() {

    let sum = 0;
    console.log('timepass function started');
    for (let i = 0; i < 5000000; i++) {
        sum += 1;
    }

    return sum
}

async function longWorker() {
    return new Promise((resolve, reject) => {
        let sum = timePassFun()
        resolve(sum);
    })
} 