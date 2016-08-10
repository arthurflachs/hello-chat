import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Welcome from '../../src/components/Welcome';

storiesOf('Welcome', module)
  .add('default', () => (
    <Welcome />
  ));
