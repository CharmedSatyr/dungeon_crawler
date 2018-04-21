import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message }) => <span>{message}</span>;

Message.propTypes = {
  message: PropTypes.string.isRequired
};

const Messages = ({ messages }) => (
  <div
    style={{
      backgroundColor: 'lightblue',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      height: 70,
      padding: 5,
      justifyContent: 'center',
      maxWidth: '100%'
    }}
  >
    {messages.map((m, i) => <Message key={i} message={m} />)}
  </div>
);

Messages.propTypes = {
  messages: PropTypes.array.isRequired
};

export default Messages;
