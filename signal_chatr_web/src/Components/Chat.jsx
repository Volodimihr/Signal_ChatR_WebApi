import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Chat({ userId }) {

    const logOutHandle = () => {
        sessionStorage.clear();
        userId(null);
    }

  return (
      <div>
          <h1>Chat</h1>
          <input type='button' onClick={logOutHandle} value='Logout' />
      </div>
  )
}
