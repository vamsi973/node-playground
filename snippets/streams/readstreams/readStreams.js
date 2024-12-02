const fs = require('fs');
const zlib = require('zlib');


const fileStream = fs.createReadStream(__dirname + '/NGINX.pdf');
var writableStream = fs.createWriteStream('write.pdf');


// fileStream.on('data', function (chunk) {
//     console.log('Chunk read');
//     console.log(chunk);
//     writableStream.write(chunk);
// });

// fileStream.on('end', () => {
//     console.log('Finished reading the file');
// });

const gzip = zlib.createGzip();


fileStream.pipe(writableStream);

fileStream.pipe(gzip).pipe(writableStream);


writableStream.on('finish', () => {
    console.log('File has been copied successfully.');
});
