// console.log("process id", process.pid); // process info about pid
// console.log("arg",process.argv); //command line arguments
// console.log("env",process.env); // user environment
// console.log("process version", process)
// console.log("process version",process.version);
// console.log("process versions",process.versions);
console.log(process.cwd());
console.log(process.uptime())

setInterval(() => {

    // console.log("Timeout"); console.log(process.hrtime())
}, 1000);

process.on("beforeExit", (code) => {
    console.log("process before exit event with code", code)
})


process.on('SIGINT', () => {
    console.log("SIGINT");
    exitQuery();
    process.exit(0);
})

function exitQuery() {
    console.log('exitquery')
    process.on('exit', (code) => { console.log('Process exit event with code:'); });
}

process.on('SIGTERM', () => {
    console.log("received sigterm")
});

// process.on("uncaughtException", (err) => {
//     console.log(err);
//     process.exit(1);
// });

// setTimeout(() => {
//     throw new Error("this manually generated exception-manual")
// }, 5000)
// process.on('unhandledRejection', (reason, promise) => {
//     console.log("unhandled reason", reason, "unhandled at", promise);
// })

// new Promise((resolve, reject) => {
//     reject("testing rejection")
// })

// process.on('uncaughtExceptionMonitor', (err, origin) => {
//     console.log("err",err)
//     console.log("origin",origin)

// })
// setTimeout(() => {
//     throw new Error("this manually generated exception for mointoring")
// }, 5000)

process.env.testVariable = 'myValue';

console.log(process.env.testVariable)


