

const chalk = require('chalk');
const electron = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackHotMiddleware = require('webpack-hot-middleware');
const opn = require('opn');

const mainConfig = require('./webpack.main.config');
const rendererConfig = process.env.IS_WEB ?
  require('./webpack.renderer.web.config') :
  require('./webpack.renderer.electron.config');

let electronProcess = null;
let manualRestart = false;
let hotMiddleware;

function logStats(proc, data) {
  let log = '';

  log += chalk.yellow.bold(`┏ ${proc} Process ${new Array((19 - proc.length) + 1).join('-')}`);
  log += '\n\n';

  if (typeof data === 'object') {
    data.toString({
      colors: true,
      chunks: false,
    }).split(/\r?\n/).forEach((line) => {
      log += `  ${line}\n`;
    });
  } else {
    log += `  ${data}\n`;
  }

  log += `\n${chalk.yellow.bold(`┗ ${new Array(28 + 1).join('-')}`)}\n`;

  console.log(log);
}

function electronLog(data, color) {
  let log = '';
  data = data.toString().split(/\r?\n/);
  data.forEach((line) => {
    log += `  ${line}\n`;
  });
  if (/[0-9A-z]+/.test(log)) {
    console.log(
      `${chalk[color].bold('┏ Electron -------------------')}

      ${log}${chalk[color].bold('┗ ----------------------------')
      }
      `,
    );
  }
}

function startRenderer() {
  return new Promise((resolve) => {
    // Add dev-client to all rendered pages
    const bundle = Object.keys(rendererConfig.entry)[0];
    rendererConfig.entry[bundle] = [path.join(__dirname, 'dev-client')].concat(rendererConfig.entry[bundle]);

    const compiler = webpack(rendererConfig);
    hotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2500,
    });

    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({ action: 'reload' });
        cb();
      });
    });

    compiler.plugin('done', (stats) => {
      logStats('Renderer', stats);
    });

    const server = new WebpackDevServer(compiler, {
      contentBase: path.join(__dirname, '../'),
      quiet: true,
      setup(app, ctx) {
        app.use(hotMiddleware);
        ctx.middleware.waitUntilValid(() => {
          resolve();
        });
      },
    });

    server.listen(8080);
  });
}

function startElectron() {
  electronProcess = spawn(electron, ['--inspect=5858', path.join(__dirname, '../dist/electron/main.js')]);

  electronProcess.stdout.on('data', (data) => {
    electronLog(data, 'blue');
  });
  electronProcess.stderr.on('data', (data) => {
    electronLog(data, 'red');
  });

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit();
  });
}

function startBrowser() {
  opn('http://localhost:8080/');
}

function startMain() {
  if (process.env.IS_WEB) return Promise.resolve();
  return new Promise((resolve) => {
    mainConfig.entry.main = [path.join(__dirname, '../src/main/index.dev.js')].concat(mainConfig.entry.main);
    const compiler = webpack(mainConfig);

    compiler.plugin('watch-run', (compilation, done) => {
      logStats('Main', chalk.white.bold('compiling...'));
      hotMiddleware.publish({ action: 'compiling' });
      done();
    });

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err);
        return;
      }

      logStats('Main', stats);

      if (electronProcess && electronProcess.kill) {
        manualRestart = true;
        process.kill(electronProcess.pid);
        electronProcess = null;
        startElectron();

        setTimeout(() => {
          manualRestart = false;
        }, 5000);
      }

      resolve();
    });
  });
}

Promise.all([startRenderer(), startMain()])
  .then(() => (process.env.IS_WEB ? startBrowser() : startElectron()))
  .catch(console.error);