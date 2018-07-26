const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const http = require('http')
const https = require('https')

const logger = require('electron-log')
const args = process.argv.slice(1);

const electron = args.some(function (val) {
  return val === '--electron';
});


if (electron) {
  console.log('start server...', '--electron', __dirname)
} else {
  console.log('start server...', '', __dirname)
}


// process.stdin.on('readable', () => {
//   const chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write(`data: ${chunk}`);
//   }
// });

process.stdin.on('data', function (data) {
    console.log('Received data: ' + data);
});
