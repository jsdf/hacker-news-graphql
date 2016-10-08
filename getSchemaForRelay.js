var Schema = require('./schema');
var graphql  = require('graphql').graphql;
var introspectionQuery = require('graphql/utilities').introspectionQuery;

// get full schema introspection for Babel Relay Plugin to use
module.exports = function getSchemaForRelay() {
  return graphql(Schema, introspectionQuery)
    .then(result => {
      if (result.errors) {
        return Promise.reject(new Error(
          'ERROR introspecting schema: ',
          JSON.stringify(result.errors, null, 2)
        ));
      }
      
      return result;
    });
};
