import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

function Register({ baseUrl, conn }) {

    const [userToReg, setUserToReg] = useState({ id: 0, name: null, email: null, password: null, avatarPath: null, parties: null });

    const handleChange = (event) => {
        const name = event.target.name;
        let value = null;
        if (name === "avatarPath") {
            value = event.target.files[0];
        }
        else {
            value = event.target.value;
        }
        setUserToReg(values => ({ ...values, [name]: value }));
    }

    const convertBase64 = (file) => new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
            reject(error)
        }
    })

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (userToReg.avatarPath != null) {
            userToReg.avatarPath = await convertBase64(userToReg.avatarPath);
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userToReg)
        };
        const data = await fetch(`${baseUrl}Users/register`, requestOptions);
        //console.log(data);
        //console.log(data.status);
        if (data.status === 201) {
            conn.invoke('Broadcast', 'users')
                .catch((err) => console.log(err));
            <Navigate to={'/login'} replace={true} />
        }
    }

    return (
        <div className="align-self-center mx-auto">
            <div className='rounded rounded-3 border border-2 shadow p-5' style={{ backgroundColor: 'whiteSmoke' }}>
                <Link className='btn btn-outline-secondary' to={'/login'}>&#60; Back</Link>
                <h1>Registration</h1>
                <form onSubmit={handleSubmit} method='post' encType='multipart/form-data'>
                    <div className='form-group'>
                        <label htmlFor="name" className='form-label'>Name</label>
                        <input type="text" id='name' name='name' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email" className='form-label'>Email</label>
                        <input type="text" id='email' name='email' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password" className='form-label'>Password</label>
                        <input type="password" id='password' name='password' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="avatarPath" className='form-label'>Avatar</label>
                        <input type="file" id='avatarPath' name='avatarPath' className='form-control' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        {userToReg.avatarPath && <img src={URL.createObjectURL(userToReg.avatarPath)} alt="avatar" />}
                    </div>
                    <div className='form-group'>
                        <input type="submit" className='form-control bg-success text-white mt-3' value={"Register"} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;