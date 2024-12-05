
function timePassFun() {
    let sum = 0;
    for (let i = 0; i < 5000000; i++) {
        sum += 1;
    }
    return sum
}

process.on("message", (message) => {
    if (message == "init") {
        let sum = timePassFun();
        process.send(sum);
    }
})