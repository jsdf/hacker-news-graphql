var levelup = require('levelup');

var db = levelup('./db', {valueEncoding: 'json'});

function get(key) {
  return new Promise((resolve, reject) => {
    db.get(key, (err, value) => {
      if (err) return reject(err);
      resolve(value);
    });
  });
}

function getWithType(type, key) {
  return get(key)
    .then(item => {
      if (item.type !== type) {
        return Promise.reject(`Expected type "${type}", got type "${item.type}" for key ${key}`);
      } else {
        return item;
      }
    });
}

module.exports = {
  db,
  getWithType,
  get: get,
};
