var levelup = require('levelup');

var db = levelup('./db', {valueEncoding: 'json'});

var TOP_STORIES_KEY = 'topstories';

function get(key) {
  return new Promise((resolve, reject) => {
    db.get(key, (err, value) => {
      if (err) return reject(err);
      resolve(value);
    });
  });
}

function log(msg) {
  console.error(new Date(), msg);
}

function logError(err) {
  console.error(new Date(), err && err.stack || err);
}

function panic(err) {
  logError(err);
  process.exit(1);
}

module.exports = {
  TOP_STORIES_KEY,
  get,
  db,
  log,
  logError,
  panic,
};
