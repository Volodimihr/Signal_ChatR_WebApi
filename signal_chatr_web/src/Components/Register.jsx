import React, { useState } from 'react';

function Register({ baseUrl, toReg }) {

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
        console.log(value);
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

        console.log(JSON.stringify(userToReg));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userToReg)
        };
        const data = await fetch(`${baseUrl}Users/register`, requestOptions);
        console.log(data);
        if (data.status === 201) {
            toReg(true);
        }
    }

    return (
        <div className='rounded rounded-3 border border-2 shadow p-5' style={{ backgroundColor: 'whiteSmoke' }}>
            <h1>Registration</h1>
            <form onSubmit={handleSubmit} method='post' encType='multipart/form-data'>
                <div className='form-group'>
                    <label htmlFor="name" className='form-label'>Name</label>
                    <input type="text" name='name' className='form-control' onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input type="text" name='email' className='form-control' onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input type="password" name='password' className='form-control' onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="avatarPath" className='form-label'>Avatar</label>
                    <input type="file" name='avatarPath' className='form-control' onChange={handleChange} />
                </div>
                <div className="form-group">
                    {userToReg.avatarPath && <img src={URL.createObjectURL(userToReg.avatarPath)} alt="avatar" />}
                </div>
                <div className='form-group'>
                    <input type="submit" className='form-control bg-success text-white mt-3' value={"Register"} />
                </div>
            </form>
        </div>
    );
}

export default Register;