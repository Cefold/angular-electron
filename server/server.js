const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const http = require('http')
const https = require('https')

const logger = require('electron-log')

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, '/dummy-miner.html'))
// })

// app.get('/get-miners-status', function (req, res) {
//   res.json(miners)
// })

console.log('something...')


logger.info('[server]', 'start serving......')

// process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    // process.stdout.write(`data: ${chunk}`);
    logger.info('[server]', chunk)
  }
});

// process.stdin.on('data', function (data) {
//     console.log('Received data: ' + data);
// });
