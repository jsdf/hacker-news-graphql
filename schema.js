var gql = require('graphql');

var constants = require('./constants');

var idType = gql.GraphQLString;

var StoryType = new gql.GraphQLObjectType({
  name: 'Story',
  description: 'A story.',
  fields: () => ({
    id: {
      type: new gql.GraphQLNonNull(idType),
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
    position: {
      type: gql.GraphQLInt,
      description: 'The position of the story.',
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
      type: new gql.GraphQLList(new gql.GraphQLNonNull(idType)),
      description: 'The ids of descendants (comments) of the story.',
    },
    descendantItems: {
      type: new gql.GraphQLList(CommentType),
      description: 'The descendants (comments) of the story.',
      resolve: (story, args, context) => {
        return Promise.all(
          story.descendentIds.map(id =>
            context.store.getWithType('comment', id)
          )
        );
      },
    },
    kids: {
      type: new gql.GraphQLList(new gql.GraphQLNonNull(idType)),
      description: 'The ids of direct descendants (comments) of the story.',
    },
    url: {
      type: gql.GraphQLString,
      description: 'The url of the story.',
    },
  }),
});

var CommentType = new gql.GraphQLObjectType({
  name: 'Comment',
  description: 'A comment.',
  fields: () => ({
    id: {
      type: new gql.GraphQLNonNull(idType),
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

var TopStoriesType = new gql.GraphQLObjectType({
  name: 'TopStories',
  description: 'top stories, in ranked order',
  fields: () => ({
    stories: {
      type: new gql.GraphQLList(StoryType),
      description: 'The story objects.',
    },
  }),
});

var Schema = new gql.GraphQLSchema({
  query: new gql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      story: {
        type: StoryType,
        args: {
          id: {
            description: 'id of the story',
            type: new gql.GraphQLNonNull(idType),
          },
        },
        resolve: (root, args, context) => (
          context.store.getWithType('story', args.id)
        ),
      },
      comment: {
        type: CommentType,
        args: {
          id: {
            description: 'id of the comment',
            type: new gql.GraphQLNonNull(idType),
          },
        },
        resolve: (root, args, context) => (
          context.store.getWithType('comment', args.id)
        ),
      },
      topstories: {
        type: TopStoriesType,
        args: {
        },
        resolve: (root, args, context) => {
          return context.store.get(constants.TOP_STORIES_KEY)
            .then(ids =>
              Promise.all(ids.map(context.store.get))
            )
            .then(items =>
              ({
                stories: (
                  items.filter(item => item.type === 'story')
                    .map((item, index) => 
                      Object.assign({position: index + 1}, item)
                    )
                ),
              })
            );
        },
      },
    },
  }),
});

module.exports = Schema;
