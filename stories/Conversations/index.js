import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Conversations from '../../src/components/Conversations';

storiesOf('Conversations', module)
  .add('list conversations', () => (
    <Conversations />
  ));
