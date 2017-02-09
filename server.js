const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')
const path = require('path')

let app = new (require('express'))()
let port = 3000

let compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})
app.get('/calendar', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/finance', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/billing', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/settings', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/me', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/logout', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/login', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
