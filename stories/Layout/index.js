import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Layout from '../../src/components/Layout';

storiesOf('Layout', module)
  .add('default', () => (
    <Layout />
  ));
