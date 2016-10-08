var graphqlHTTP = require('express-graphql');
var schema = require('./schema');
var store = require('./store');

module.exports = graphqlHTTP({
  schema,
  context: {
    store,
  },
  graphiql: true,
});
