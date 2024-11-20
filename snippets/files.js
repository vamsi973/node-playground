const fs = require("fs");
const path = require('path');
console.log(__dirname)
// console.log(__filename)

setInterval(() => {
    // testFunc();
}, 3000)

// you can write data into file
false && fs.writeFileSync('sample.txt', `Hello sample text ${Math.random()}`)




false && fs.writeFile('sample-Async.txt', `Hello sample text ${Math.random()} --Async`, (err, result) => {
    if (err) {
        throw new Error("file creation interupted")
    }
    console.log(result);
});

// file read
false && fs.readFileSync('./sample.txt', 'utf8');

false && fs.readFile('./sample-Async.txt', 'utf8', (err, data) => {
    if (err) console.log(err)
    console.log(data)
})


false && fs.appendFileSync('sample.txt', `time: ${new Date()} \t Hello sample text ${Math.random()} \n`)
false && fs.appendFile('sample-Async.txt', `time: ${new Date()} \t Hello sample text ${Math.random()} \n`, (err, dataaa) => {
    console.log(dataaa, 900)
})

false && fs.unlink('sample.txt', (err) => {
    console.log(err)
})

false && fs.unlinkSync('sample-Async.txt')

false && fs.mkdirSync('test/test')
false && fs.mkdir('test/test/test', (err) => console.log(err))

let relativepath = path.join(__dirname, "test/index.html");
console.log(relativepath)


let relativeData = fs.readFileSync(relativepath, 'utf8');
console.log(relativeData)



fs.stat('logger.txt', (err, data) => console.log("file status", data));

fs.rename('log.txt', "logger.txt", err => console.log(err))

fs.access('sample.txt',fs.constants.F_OK,err=>console.log(err));


fs.chmod('logger.txt',0o555)
// fs.access()
// fs.chmod(path, mode, callback)
//fs.rename()

function testFunc() {
    fs.appendFile('sample-Async.txt', `time: ${new Date()} \t Hello sample text ${Math.random()} \n`, (err, dataaa) => {
        console.log(dataaa, 900)
    })
}