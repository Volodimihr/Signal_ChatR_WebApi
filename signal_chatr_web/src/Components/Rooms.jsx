import React, { useEffect, useState, useCallback } from 'react';
import Toast from 'react-bootstrap/Toast';

  function Rooms({ baseUrl, userId, users }) {

  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const [room, setRoom] = useState({
    name: null, isPrivate: false,
    parties: [{ userId: userId }]
  });

  const getRooms = useCallback(async () => {
    const res = await fetch(`${baseUrl}rooms/userId/${userId}`)
      .then(response => response.status === 200 ? response.json() : null)
      .then(data => setRooms(data))
      .catch(err => console.error(err));
  }, [userId, show]);

  const handleToggle = () => setShow(!show);
  const handleAddRoom = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(room)
    };
    await fetch(`${baseUrl}Rooms`, requestOptions)
      .then(response => response.status === 201 ? handleToggle() : null)
      .catch(err => console.error(err));
  };

  // Test list
  const list = [];
  for (let index = 0; index < 21; index++) {
    list.push(<div className="list-group-item" key={index}>Friend</div>);
  }

  useEffect(() => { getRooms() }, [getRooms]);

  return (
    <div className='rooms w-25 h-100 bg-white'>
      <div className='rounded border d-flex justify-content-around align-items-middle'>
        <div className='my-auto fs-5'>Start chating &#62;</div>
        <button type='button' className='btn fs-3' onClick={handleToggle}>+</button>
      </div>
      <Toast className='toast w-25 position-fixed top-5 start-0' style={{ zIndex: 1 }} show={show} onClose={handleToggle}>
        <Toast.Header closeButton={false}>
          <form method='post' onSubmit={handleAddRoom} className='d-flex align-items-center'>
            <img className='add-group-img' src="src/assets/add_group.png" alt="add-group" />
            <input type="text" name="roomName" id="roomName" onChange={(e) => setRoom({ ...room, name: e.target.value })} className='form-control mx-2' placeholder='Room Name...' />
            <button type='submit' className='btn border flex-grow-1'>New Room</button>
          </form>
        </Toast.Header>
        <Toast.Body className='bg-white'>
          <div>
            <form method="get" className='d-flex justify-content-between align-items-center'>
              <img className='chat-img' src="src/assets/chat.png" alt="chat-img" />
              <div>
                <input type="search" name="searchContact" id="searchContact" placeholder='Search...' className='form-control' />
              </div>
            </form>
          </div>
          <hr />
          <div className='contacts-list overflow-auto'>
            {list}
          </div>
        </Toast.Body>
      </Toast>
      <div className="list-group overflow-auto h-90">
        {
          rooms && rooms.map((room) => {
            return <div className='list-group-item' key={room.id}>{room.name}</div>
          })
        }
      </div>
    </div>
  )
}

export default Rooms;