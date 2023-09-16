import React, { useEffect, useState, useCallback } from 'react'

export default function Header({baseUrl, userId, setUserId }) {

  const [user, setUser] = useState({});

  const handleLogout = () => {
    sessionStorage.setItem('userId', null);
    setUserId(null);
  };

  const getUser = useCallback(async () => {
    await fetch(`${baseUrl}Users/${userId}`)
      .then(response => response.status === 200 ? response.json() : null)
      .then(data => {setUser(data); console.log(data);})
      .catch(err => console.error(err));
  }, [userId]);

  useEffect(()=>{
    getUser();
  }, [getUser]);

  return (
    <div className='header d-flex'>
      <div className='align-self-center'>
        {console.log(user)}
        <img src={user.avatarPath} alt="avatar" />
      </div>
      <div></div>
      <button className='btn btn-info align-self-center ms-auto'
        type="button" onClick={handleLogout}>Logout</button>
    </div>
  )
}
