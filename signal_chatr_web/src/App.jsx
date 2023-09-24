import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Login from './Components/Login'
import Register from './Components/Register';
import { useEffect } from 'react';
import Chat from './Components/Chat';
import useSessionStorageState from 'use-session-storage-state';
import * as signalR from '@microsoft/signalr';

function App() {

    document.body.style.backgroundImage = `url('src/assets/wallpapper.jpg')`;

    const baseUrl = 'http://localhost:5000/api/';

    // SignalR

    const conn = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5000/notify')
    .build();

    async function start() {
        try {
            await conn.start();
        } catch (err) {
            console.log(err);
            setTimeout(start, 30000);
        }
    };
    
    conn.onclose(async () => {
        await start();
    });
    
    start();
    //----

    const [userId, setUserId] = useSessionStorageState('userId', { defaultValue: null });
    const [roomId, setRoomId] = useState(0);

    return (
        <div className='w-100 h-100 d-flex'>
            {
                userId !== null && (<Navigate to={'/signal'} replace={true} />)
            }
            <Routes>
                <Route path='/' element={<Navigate to={'/login'} replace={true} />} />
                <Route path='login' element={<Login conn={conn} baseUrl={baseUrl} setUserId={setUserId} />} />
                <Route path='register' element={<Register baseUrl={baseUrl} />} />
                <Route path='signal'
                    element={<Chat
                        baseUrl={baseUrl}
                        conn={conn}
                        userId={userId} setUserId={setUserId}
                        roomId={roomId} setRoomId={setRoomId} />} />
            </Routes>
        </div>
    );
}

export default App
