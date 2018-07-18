import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as logger from 'electron-log';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height
  });

  if (serve) {
    require('electron-reload')(__dirname, {
     electron: require(`${__dirname}/node_modules/electron`)});
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}



const {
  spawn,
  execFile,
  fork,
  exec
} = require('child_process')

const rootFolder = process.env.NODE_ENV === 'development'
  ? process.cwd()
  : path.join(__dirname, '.')

var executableFolder = path.join(__dirname, '../resources')


var child = spawn("node", ['server/server.js'],{
  cwd: rootFolder,
  detached: false
}) 



child.stdout.on('data', (data) => {
  console.log(`child stdout:\n${data}`)
  
})

child.stderr.on('data', (data) => {
  console.error(`child stderr:\n${data}`)
})


child.on('exit', function (code, signal) {
  logger.warn('child process exited with ' +
    `code ${code} and signal ${signal}`)
}) 

setInterval(() => {
  child.stdin.write('11 this is my res');
  // child.stdin.end();
}, 2000)
