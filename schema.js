var gql = require('graphql');
 
var get = require('./utils').get;

var storyType = new gql.GraphQLObjectType({
  name: 'Story',
  description: 'A story.',
  fields: () => ({
    id: {
      type: new gql.GraphQLNonNull(gql.GraphQLString),
      description: 'The id of the story.',
    },
    title: {
      type: gql.GraphQLString,
      description: 'The name of the story.',
    },
    by: {
      type: gql.GraphQLString,
      description: 'The author of the story.',
    },
    score: {
      type: gql.GraphQLInt,
      description: 'The score of the story.',
    },
    time: {
      type: gql.GraphQLInt,
      description: 'The time of the story.',
    },
    descendants: {
      type: gql.GraphQLInt,
      description: 'The number of descendants of the story.',
    },
    url: {
      type: gql.GraphQLString,
      description: 'The url of the story.',
    },
  }),
});

var schema = new gql.GraphQLSchema({
  query: new gql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      story: {
        type: storyType,
        args: {
          id: {
            description: 'id of the story',
            type: new gql.GraphQLNonNull(gql.GraphQLString),
          },
        },
        resolve: (root, args) => get(args.id),
      },
    },
  }),
});

module.exports = schema;
