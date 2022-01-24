/**
 * Module dependencies.
 */
const config = require('config');
const express = require('express');
const compression = require('compression');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const path = require('path');
const models = require('./models');

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('host', config.get('host') || '0.0.0.0');
app.set('port', config.get('port') || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.disable('x-powered-by');

app.use('/dist', express.static(path.join(__dirname, 'dist'), { maxAge: 31557600000 }));
app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// Initialize router
app.use(require('./router'));

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode: status: OK', app.get('port'), app.get('env'));
  console.log('Press CTRL-C to stop\n');
});

module.exports = app;
