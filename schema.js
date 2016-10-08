var gql = require('graphql');
 
var getWithType = require('./utils').getWithType;

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
      description: 'The title of the story.',
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
      description: 'The number of descendants (comments) of the story.',
    },
    descendantIds: {
      type: gql.GraphQLInt,
      description: 'The ids of descendants (comments) of the story.',
    },
    kids: {
      type: gql.GraphQLInt,
      description: 'The ids of direct descendants (comments) of the story.',
    },
    url: {
      type: gql.GraphQLString,
      description: 'The url of the story.',
    },
  }),
});

var commentType = new gql.GraphQLObjectType({
  name: 'Comment',
  description: 'A comment.',
  fields: () => ({
    id: {
      type: new gql.GraphQLNonNull(gql.GraphQLString),
      description: 'The id of the comment.',
    },
    parent: {
      type: new gql.GraphQLNonNull(gql.GraphQLString),
      description: 'The id of the parent of the comment.',
    },
    text: {
      type: gql.GraphQLString,
      description: 'The body text (html) of the comment.',
    },
    by: {
      type: gql.GraphQLString,
      description: 'The author of the comment.',
    },
    time: {
      type: gql.GraphQLInt,
      description: 'The time of the comment.',
    },
    kids: {
      type: gql.GraphQLInt,
      description: 'The ids of direct descendants (comments) of the comment.',
    },
  }),
});

var commentType = new gql.GraphQLObjectType({
  name: 'Comment',
  description: 'A comment.',
  fields: () => ({
    id: {
      type: new gql.GraphQLNonNull(gql.GraphQLString),
      description: 'The id of the comment.',
    },
    parent: {
      type: new gql.GraphQLNonNull(gql.GraphQLString),
      description: 'The id of the parent of the comment.',
    },
    text: {
      type: gql.GraphQLString,
      description: 'The body text (html) of the comment.',
    },
    by: {
      type: gql.GraphQLString,
      description: 'The author of the comment.',
    },
    time: {
      type: gql.GraphQLInt,
      description: 'The time of the comment.',
    },
    kids: {
      type: gql.GraphQLInt,
      description: 'The ids of direct descendants (comments) of the comment.',
    },
  }),
});

var topStoriesType = new gql.GraphQLObjectType({
  name: 'TopStories',
  description: 'The top stories.',
  fields: () => ({
    ids: {
      type: new gql.GraphQLArray,
      description: 'The id of the comment.',
    },
    parent: {
      type: new gql.GraphQLNonNull(gql.GraphQLString),
      description: 'The id of the parent of the comment.',
    },
    text: {
      type: gql.GraphQLString,
      description: 'The body text (html) of the comment.',
    },
    by: {
      type: gql.GraphQLString,
      description: 'The author of the comment.',
    },
    time: {
      type: gql.GraphQLInt,
      description: 'The time of the comment.',
    },
    kids: {
      type: gql.GraphQLInt,
      description: 'The ids of direct descendants (comments) of the comment.',
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
        resolve: (root, args) => getWithType('story', args.id),
      },
      comment: {
        type: commentType,
        args: {
          id: {
            description: 'id of the comment',
            type: new gql.GraphQLNonNull(gql.GraphQLString),
          },
        },
        resolve: (root, args) => getWithType('comment', args.id),
      },
      topstories: {
        type: topStoriesType,
        args: {
        },
        resolve: (root) => get(utils.TOP_STORIES_KEY),
      },
    },
  }),
});

module.exports = schema;
