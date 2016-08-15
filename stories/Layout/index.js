import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Layout from '../../src/components/Layout';

storiesOf('Layout', module)
  .add('default', () => (
    <Layout onNextChat={action('NEXT')}/>
  ));
