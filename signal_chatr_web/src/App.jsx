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

    useEffect(() => {
        console.log(userId);
    }, [userId]);


    return (
        <div>
            <Routes>
                <Route path='/' element={<Chat baseUrl={baseUrl} userId={setUserId} />} />
                <Route path='register' element={<Register baseUrl={baseUrl} />} />
                <Route path='login' element={<Login baseUrl={baseUrl} userId={setUserId} />} />
            </Routes>
            {
                userId === null || userId === ""
                    ? <Navigate to={'/login'} />
                    : <Navigate to={'/'} />
            }
        </div>
    );
}

export default App
