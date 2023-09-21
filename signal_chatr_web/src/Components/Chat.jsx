import React, { useState, useCallback, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../Components/Header';
import Msgsarea from '../Components/Msgsarea';
import Sender from '../Components/Sender';
import Rooms from '../Components/Rooms';

export default function Chat({ baseUrl, conn, userId, setUserId, roomId, setRoomId }) {

    const [users, setUsers] = useState([]);
    const [msgs, setMsgs] = useState([]);

    conn.on('notify', (msg) => {
        if (msg === 'users') {
            getUsers();
        }
        else if (msg === 'messages') {
            getMsgs();
        }
    });

    const getUsers = useCallback(async () => {
        await fetch(`${baseUrl}users/data`)
            .then(response => response.status === 200 ? response.json() : null)
            .then(data => setUsers(data))
            .catch(err => console.error(err));
    }, []);

    const getMsgs = useCallback(async () => {
        await fetch(`${baseUrl}messages/roomId/${roomId}`)
            .then(response => response.status === 200 ? response.json() : null)
            .then(data => setMsgs(data))
            .catch(err => console.error(err));
    }, [roomId]);

    useEffect(() => {
        getUsers();
        getMsgs();
    }, [getUsers, getMsgs, roomId]);

    return (
        <div className='w-100 h-100 d-flex flex-column'>
            {
                userId === null && (<Navigate to={'/login'} replace={true} />)
            }
            <Header baseUrl={baseUrl} setUserId={setUserId} userId={userId} roomId={roomId} />
            <div className="worker d-flex">
                <Rooms baseUrl={baseUrl} roomId={roomId} setRoomId={setRoomId} userId={userId} users={users} />
                <div className="msg w-75 d-flex flex-column">
                    <Msgsarea msgs={msgs} userId={userId} />
                    <Sender baseUrl={baseUrl} userId={userId} roomId={roomId} conn={conn} />
                </div>
            </div>
        </div>
    )
}
