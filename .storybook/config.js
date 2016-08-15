import { configure } from '@kadira/storybook';

require('reset.css');
require('./base.css');

function loadStories() {
  require('../stories/Welcome');
  require('../stories/Conversations');
  require('../stories/Chat');
  require('../stories/Layout');
}

configure(loadStories, module);
