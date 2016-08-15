import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Chat from '../../src/components/Chat';
import Layout from '../../src/components/Layout';

const messages = [
  { content: 'Salut' },
  { content: 'Hello!' },
  { content: 'Ca va ?' },
  { content: 'Oui et toi ?' },
  { content: 'ca va, ca va. Intéressante conversation' },
];

storiesOf('Chat', module)
  .add('default', () => (
    <Layout>
      <Chat onReply={action('REPLIED')} messages={messages} />
    </Layout>
  ));
