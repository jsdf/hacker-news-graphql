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
  log,
  logError,
  panic,
};
