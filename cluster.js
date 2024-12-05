const express = require('express');
const cluster = require('cluster');
const os = require('os');
const app = express();
const port = 5200;
const cpusCount = os.cpus().length;

// Handle the /timepass endpoint
app.get("/timepass", (req, res) => {
    let sum = timePassFun();
    res.send({ sum: sum, pid: process.pid }); // return the PID of the worker
});

// Handle the /timepass2 endpoint (using async function)
app.get("/timepass2", async (req, res) => {
    let sum = await longWorker();
    res.send({ sum: sum, pid: process.pid }); // return the PID of the worker
});

// Function that does some computation to simulate workload
function timePassFun() {
    let sum = 0;
    console.log('timepass function started');
    for (let i = 0; i < 5000000; i++) {
        sum += 1;
    }
    return sum;
}

// Async function that wraps the timePassFun in a promise
async function longWorker() {
    return new Promise((resolve, reject) => {
        let sum = timePassFun();
        resolve(sum);
    });
}

// Cluster setup: Fork workers if the process is the primary one
if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is forking workers...`);
    // Fork workers for each CPU core
    for (let i = 0; i < cpusCount; i++) {
        cluster.fork(); // Each worker gets a unique PID
    }

    // Listen to worker events, useful for debugging worker crashes
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, signal: ${signal}`);
        cluster.fork();
    });
} else {
    // Workers handle incoming requests
    app.listen(port, () => {
        console.log(`Worker ${process.pid} started and listening on port ${port}`);
    });
}
