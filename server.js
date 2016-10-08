var express = require('express');
var hnGraphQLMiddleware = require('./hnGraphQLMiddleware');

var app = express();
app.use('/graphql', hnGraphQLMiddleware);

module.exports = (customPort) => {
  var port = customPort || 4000;
  app.listen(port, () => {
    console.log(`listening on localhost:${port}`);
  });
};
