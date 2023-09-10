import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Login from './Components/Login'
import Register from './Components/Register';

function App() {

    document.body.style.backgroundImage = `url('wallpapper.jpg')`;

    const baseUrl = 'http://localhost:5000/api/';

    const [userId, setUserId] = useState(sessionStorage.getItem("UserId"));
    const [reg, setReg] = useState(false);
    console.log(userId);

    const handleClick = () => {

    }

    if (userId === null || userId === "")
        return (
            <div>
                {reg
                    ? <Register baseUrl={baseUrl} />
                    : <Login baseUrl={baseUrl} toReg={setReg} />
                }
            </div>
        );
}

export default App
