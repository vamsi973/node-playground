//Advanced Example 4: Streaming Data from Multiple Sources and Combining Streams
const fs = require('fs');
const stream = require('stream');

// Create two readable streams for two files
const fileStream1 = fs.createReadStream('file1.txt');
const fileStream2 = fs.createReadStream('file2.txt');

// Create a writable stream for the output
const outputStream = fs.createWriteStream('combinedOutput.txt');

// Create a custom transform stream to merge data from both files
const mergeStream = new stream.Transform({
  transform(chunk, encoding, callback) {
    // Combine the chunks from both file streams
    this.push(chunk); // Pass the chunk to the next stream
    callback();
  }
});

// Use the mergeStream to combine both input streams into one output stream
fileStream1.pipe(mergeStream).pipe(outputStream);
fileStream2.pipe(mergeStream).pipe(outputStream);

// When the process finishes
outputStream.on('finish', () => {
  console.log('Data from both files has been merged and written to combinedOutput.txt');
});

