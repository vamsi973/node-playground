const fs = require('fs');

// Create a writable stream to write data to a file
const writableStream = fs.createWriteStream('output.txt');

// Writing some data to the file
writableStream.write('Hello, this is the first line.\n');
writableStream.write('This is the second line.\n');
writableStream.write('This is the third line.\n');

// End the writable stream, signaling that no more data will be written
writableStream.end(() => {
  console.log('Data has been written to output.txt');
});
