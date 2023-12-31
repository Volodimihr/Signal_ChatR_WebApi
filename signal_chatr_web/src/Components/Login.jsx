import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ conn, baseUrl, setUserId }) {

    const [userData, setUserData] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserData(values => ({ ...values, [name]: value }));
    }

    const handleSetUserId = (userId) => {
        sessionStorage.setItem("userId", userId);
        setUserId(userId);
        conn.invoke('WhoPresent', userId);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(userData);
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        };

        await fetch(`${baseUrl}Users/login`, requestOptions)
            .then(response => response.status === 200 ? response.json() : null)
            .then(data => handleSetUserId(data))
            .catch(err => console.error(err));
    }

    return (
        <div className="align-self-center mx-auto">
            <div className='rounded rounded-3 border border-2 shadow p-5 text-center' style={{ backgroundColor: 'whiteSmoke' }}>
                <h1>Wellcome to Signal chat</h1>
                <form onSubmit={handleSubmit} method='post' >
                    <div className='form-group'>
                        <label htmlFor="email" className='form-label'>Email</label>
                        <input type="text" id='email' name='email' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password" className='form-label'>Password</label>
                        <input type="password" id='password' name='password' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <input type="submit" className='form-control bg-success text-white mt-3' value={"Login"} />
                    </div>
                </form>
                <Link className='form-control bg-success text-white mt-3 text-decoration-none' to={'/register'}>Register</Link>
            </div>
        </div>
    );
}

export default Login;