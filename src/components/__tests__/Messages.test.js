import React from 'react';
import { Message } from '../Messages';
import Messages from '../Messages';
import { shallow } from 'enzyme';

describe('`Message` component', () => {
  it('should render without crashing', () => {
    const props = { message: 'The player is doing something!' };
    const message = shallow(<Message {...props} />);
    expect(message).toHaveLength(1);
  });
});

describe('`Messages` component', () => {
  const props = { messages: ['This is a message', 'And another'] };
  const messages = shallow(<Messages {...props} />);
  it('should render without crashing', () => {
    expect(messages).toHaveLength(1);
  });
  it('should contain one or more instances of `Message` component', () => {
    expect(messages.find(Message)).toHaveLength(2);
  });
});
