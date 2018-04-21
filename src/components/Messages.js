import React from 'react';

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
    {messages.map((m, i) => <span key={i}>{m}</span>)}
  </div>
);

export default Messages;
