import { useState } from 'react'
import './App.css'
import Login from './Components/Login'

function App() {
    const [userId, setUserId] = useState(sessionStorage.getItem("UserId"));
    console.log(userId);
    if (userId === null || userId === "")
        return (
            <Login />
        );
}

export default App
