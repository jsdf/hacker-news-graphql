var express = require('express');
var graphqlHTTP = require('express-graphql');
var schema = require('./schema');

var app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000);
