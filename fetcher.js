var hn = require('hacker-news-api-client');
 
var utils = require('./utils');
var constants = require('./constants');
var store = require('./store');

hn.getTopStoryIds()
  .then(ids => Promise.all(ids.map(id => hn.fetchStory(id))))
  .then(stories => {
    return new Promise((resolve, reject) => {
      var batch = store.db.batch();

      var topStoryIds = [];
      stories.forEach(data => {
        // write comments
        var descendentIds = [];
        data.comments.forEach(c => {
          descendentIds.push(c.id);
          batch.put(c.id, c);
        });

        // write story
        var storyRecord = Object.assign({descendentIds}, data.story);
        topStoryIds.push(storyRecord.id);
        batch.put(storyRecord.id, storyRecord);
      });

      // write current top stories
      batch.put(constants.TOP_STORIES_KEY, topStoryIds);

      batch.write(err => {
        if (err) return reject(err);
        else return resolve();
      });
    });
  })
  .catch(utils.panic)
  .then(() => {
    process.exit(0);
  });
