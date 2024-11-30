const fs = require('fs');
const JSONStream = require('JSONStream');

// Create a readable stream from the large JSON file
const fileStream = fs.createReadStream('largeData.json');

// Use JSONStream to parse the JSON data stream
const jsonParserStream = JSONStream.parse('*');

// Create a writable stream to save the filtered JSON data
const outputStream = fs.createWriteStream('filteredData.json');

// Pipe the file stream through the JSON parser and into the output stream
fileStream.pipe(jsonParserStream).pipe(outputStream);

// Filter out certain data points on the fly while streaming
jsonParserStream.on('data', (data) => {
  // For example, only include data where the `active` field is true
  if (data.active) {
    outputStream.write(JSON.stringify(data) + '\n'); // Write valid data to the output stream
  }
});

// Handle end of processing
outputStream.on('finish', () => {
  console.log('Filtered data has been written to filteredData.json');
});
