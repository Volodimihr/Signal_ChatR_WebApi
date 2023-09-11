import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'Header';
import Msgsarea from 'Msgsarea';
import Sender from 'Sender';
import Rooms from 'Rooms';

export default function Chat({ userId }) {

    const logOutHandle = () => {
        userId(null);
    }

    return (
        <div>
            <h1>Chat</h1>
            <input type='button' onClick={logOutHandle} value='Logout' />
            <Header />
            <Msgsarea />
            <Sender />
            <Rooms />
        </div>
    )
}
