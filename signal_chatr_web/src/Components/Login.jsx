import React, { useState } from 'react';

function Login() {

  const [userData, setUserData] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserData(values => ({ ...values, [name]: value }));
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(userData);
  }

  return (
      <div>
          <form onSubmit={handleSubmit} >
            <div className='form-group'>
              <label htmlFor="email">Email</label>
              <input type="text" name='email' onChange={handleChange} />
            </div>
            <div className='form-group'>
              <label htmlFor="password" className='form-label'>Email</label>
              <input type="password" name='password' className='form-control' onChange={handleChange} />
            </div>
            <div className='form-group'>
              <input type="submit" className='btn btn-success' value={"Login"} />
            </div>
          </form>
      </div>
  );
}

export default Login;