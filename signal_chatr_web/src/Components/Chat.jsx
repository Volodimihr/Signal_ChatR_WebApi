import React, { useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../Components/Header';
import Msgsarea from '../Components/Msgsarea';
import Sender from '../Components/Sender';
import Rooms from '../Components/Rooms';

export default function Chat({baseUrl, userId, setUserId }) {
    
    const [rooms, setRooms] = useState([]);
    const [users, setUsers] = useState([]);
    const [msgs, setMsgs] = useState([]);
    const [msg, setMsg] = useState({});

    const getRooms = useCallback(async () => {
        const res = await fetch();
    }, [userId]);

    return (
        <div className='w-100 h-100 d-flex flex-column'>
            {
                userId ? null : (<Navigate to={'/login'} replace={true} />)
            }
            <Header />
            <div className="worker d-flex">
                <Rooms />
                <div className="msg w-75 d-flex flex-column">
                    <Msgsarea />
                    <Sender />
                </div>
            </div>
        </div>
    )
}
