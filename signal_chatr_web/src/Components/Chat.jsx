import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Msgsarea from '../Components/Msgsarea';
import Sender from '../Components/Sender';
import Rooms from '../Components/Rooms';

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
