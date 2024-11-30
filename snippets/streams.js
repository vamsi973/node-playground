const fs = require("fs");
const zlib = require('zlib')
/**Example 1 */

const read = fs.createReadStream(__dirname + '/nginx.pdf');
const writestream = fs.createWriteStream('copypdy.pdf.gz');
/*
read.on("data", (chunk) => {
    console.log("chunk ", chunk);
    writestream.write(chunk);
});

read.on("err", (err) => {
    console.log(err);
})
    */

/**Example 2 */
// read.pipe(writestream);

const gzip = zlib.createGzip();
// read.pipe(writestream);
read.pipe(gzip).pipe(writestream)

writestream.on('finish', () => {
    console.log("writing finshed")
})