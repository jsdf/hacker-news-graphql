var utils = require('./utils');
var constants = require('./constants');
var store = require('./store');

store.get(constants.TOP_STORIES_KEY)
  .then(topStoryIds => store.get(topStoryIds[0]))
  .then(firstStory =>
    Promise.all([
      Promise.resolve(firstStory),
      firstStory.kids[0] ? store.get(firstStory.kids[0]) : null,
    ])
  )
  .then(data => {
    console.log(JSON.stringify(data[0], null, 2));
    console.log(JSON.stringify(data[1], null, 2));
  })
  .catch(utils.panic);
