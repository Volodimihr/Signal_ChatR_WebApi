import React, { useState, useCallback, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../Components/Header';
import Msgsarea from '../Components/Msgsarea';
import Sender from '../Components/Sender';
import Rooms from '../Components/Rooms';

export default function Chat({ baseUrl, userId, setUserId }) {

    const [rooms, setRooms] = useState([]);
    const [users, setUsers] = useState([]);
    const [msgs, setMsgs] = useState([]);
    const [msg, setMsg] = useState({});

    const getRooms = useCallback(async () => {
        await fetch(`${baseUrl}rooms/userId/${userId}`)
            .then(response => response.status === 200 ? response.json() : null)
            .then(data => setRooms(data))
            .catch(err => console.error(err));
    }, [userId]);

    useEffect(() => {
        getRooms();
        console.log(userId);
        console.log(typeof(userId));
    }, [getRooms]);

    return (
        <div className='w-100 h-100 d-flex flex-column'>
            {
                userId === null && (<Navigate to={'/login'} replace={true} />)
            }
            <Header baseUrl={baseUrl} setUserId={setUserId} userId={userId} />
            <div className="worker d-flex">
                <Rooms rooms={rooms} />
                <div className="msg w-75 d-flex flex-column">
                    <Msgsarea />
                    <Sender />
                </div>
            </div>
        </div>
    )
}
