import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Welcome from '../../src/components/Welcome';

storiesOf('Welcome', module)
  .add('default', () => (
    <Welcome onStartChat={action('START CHAT')} />
  ));
