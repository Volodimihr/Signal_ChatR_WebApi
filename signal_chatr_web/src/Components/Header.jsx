import React, { useEffect, useState, useCallback } from 'react'

export default function Header({ baseUrl, userId, setUserId, roomId }) {

  const [user, setUser] = useState({});
  const [room, setRoom] = useState({});

  const handleLogout = () => {
    sessionStorage.setItem('userId', null);
    setUserId(null);
  };

  const getUser = useCallback(async () => {
    await fetch(`${baseUrl}Users/data/${userId}`)
      .then(response => response.status === 200 ? response.json() : null)
      .then(data => { setUser(data) })
      .catch(err => console.error(err));
  }, [userId]);

  const getRoomById = useCallback( async () => { roomId &&
    await fetch(`${baseUrl}rooms/${roomId}`)
      .then(response => response.status === 200 ? response.json() : null)
      .then(data => setRoom(data))
      .catch(err => console.error(err));
  }, [roomId]);

  useEffect(() => {
    getUser();
    getRoomById();
  }, [getUser, getRoomById]);

  return (
    <div className='header d-flex align-items-center justify-content-between'>
      <div className='d-flex h-100'>
        <img className='object-fit-contain border rounded rounded-4 m-1' src={user.avatarPath} alt="avatar" />
        <div className="align-self-center">
          <h2 className=''>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>
      <div>
        <div className='fs-1'>{room.name}</div>
      </div>
      <button className='btn btn-info'
        type="button" onClick={handleLogout}>Logout</button>
    </div>
  )
}
