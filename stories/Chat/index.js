import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Chat from '../../src/components/Chat';
import Layout from '../../src/components/Layout';

storiesOf('Chat', module)
  .add('default', () => (
    <Layout>
      <Chat onReply={action('REPLIED')} />
    </Layout>
  ));
