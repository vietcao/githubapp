const Logger = require('js-logger');

Logger.useDefaults();

if (process.env.NODE_ENV === 'production') {
  Logger.setLevel(Logger.OFF);
}