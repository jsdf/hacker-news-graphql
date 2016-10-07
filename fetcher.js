var hn = require('hacker-news-api-client');
 
var utils = require('./utils');

hn.getTopStoryIds()
  .then(ids => Promise.all(ids.map(id => hn.fetchStory(id))))
  .then(stories => {
    return new Promise((resolve, reject) => {
      var b = utils.db.batch();

      var topStoryIds = [];
      stories.forEach(data => {
        // write comments
        var descendentIds = [];
        data.comments.forEach(c => {
          descendentIds.push(c.id);
          b.put(c.id, c);
        });

        // write story
        var storyRecord = Object.assign({descendentIds}, data.story);
        topStoryIds.push(storyRecord.id);
        b.put(storyRecord.id, storyRecord);
      });

      // write current top stories
      b.put(utils.TOP_STORIES_KEY, topStoryIds);

      b.write(err => {
        if (err) return reject(err);
        else return resolve();
      });
    });
  })
  .catch(utils.panic)
  .then(() => {
    process.exit(0);
  });
