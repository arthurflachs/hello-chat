import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Chat from '../../src/components/Chat';

storiesOf('Chat', module)
  .add('default', () => (
    <Chat onReply={action('REPLIED')} />
  ));
