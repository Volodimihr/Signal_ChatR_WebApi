import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Login from './Components/Login'
import Register from './Components/Register';
import { useEffect } from 'react';
import Chat from './Components/Chat';

function App() {

    document.body.style.backgroundImage = `url('wallpapper.jpg')`;

    const baseUrl = 'http://localhost:5000/api/';

    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

    const handleUserIdChange = async(userId) => {
        setUserId(userId);
    }


    return (
        <div className='w-100 h-100 d-flex'>
            {
                userId && ( <Navigate to={'/signal'} replace={true} />)
            }
            <Routes>
                <Route path='/' element={<Navigate to={'/login'} replace={true} />} />
                <Route path='login' element={<Login baseUrl={baseUrl} userId={handleUserIdChange} />} />
                <Route path='register' element={<Register baseUrl={baseUrl} />} />
                <Route path='signal' element={<Chat baseUrl={baseUrl} userId={userId} setUserId={setUserId} />} />
            </Routes>
        </div>
    );
}

export default App
