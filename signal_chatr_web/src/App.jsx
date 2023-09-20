import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Login from './Components/Login'
import Register from './Components/Register';
import { useEffect } from 'react';
import Chat from './Components/Chat';
import useSessionStorageState from 'use-session-storage-state';

function App() {

    document.body.style.backgroundImage = `url('src/assets/wallpapper.jpg')`;

    const baseUrl = 'http://localhost:5000/api/';

    const [userId, setUserId] = useSessionStorageState('userId', { defaultValue: null });
    const [roomId, setRoomId] = useState(0);

    useEffect(() => {}, [userId, roomId]);

    return (
        <div className='w-100 h-100 d-flex'>
            {
                userId !== null && (<Navigate to={'/signal'} replace={true} />)
            }
            <Routes>
                <Route path='/' element={<Navigate to={'/login'} replace={true} />} />
                <Route path='login' element={<Login baseUrl={baseUrl} setUserId={setUserId} />} />
                <Route path='register' element={<Register baseUrl={baseUrl} />} />
                <Route path='signal'
                    element={<Chat
                        baseUrl={baseUrl}
                        userId={userId} setUserId={setUserId}
                        roomId={roomId} setRoomId={setRoomId} />} />
            </Routes>
        </div>
    );
}

export default App
