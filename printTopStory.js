var utils = require('./utils');
var get = utils.get;

get(utils.TOP_STORIES_KEY)
  .then(topStoryIds => get(topStoryIds[0]))
  .then(firstStory =>
    Promise.all([
      Promise.resolve(firstStory),
      firstStory.kids[0] ? get(firstStory.kids[0]) : null,
    ])
  )
  .then(data => {
    console.log(JSON.stringify(data[0], null, 2));
    console.log(JSON.stringify(data[1], null, 2));
  })
  .catch(utils.panic);
