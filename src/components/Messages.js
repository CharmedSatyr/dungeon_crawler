import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message }) => <span>{message}</span>;

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

Message.propTypes = {
  message: PropTypes.string.isRequired
};

Messages.propTypes = {
  messages: PropTypes.array.isRequired
};

export default Messages;
