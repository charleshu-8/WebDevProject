import React from 'react';

const Message = ({ text }) => {
  return (
    <div className="p-2 mb-2 bg-white rounded-lg shadow">
      {text}
    </div>
  );
};

export default Message;