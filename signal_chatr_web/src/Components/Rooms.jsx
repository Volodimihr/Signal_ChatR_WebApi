import React, { useEffect, useState, useCallback } from 'react';
import Toast from 'react-bootstrap/Toast';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

function Rooms({ baseUrl, roomId, setRoomId, userId, users }) {

  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const [room, setRoom] = useState({
    name: null, isPrivate: false,
    parties: [{ userId: userId }]
  });

  const getRooms = useCallback(async () => {
    await fetch(`${baseUrl}rooms`)
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

  const handleDeleteRoom = useCallback(async (roomId) => {
    await fetch(`${baseUrl}parties/${roomId}/${userId}`, { method: 'DELETE' })
      .then(response => response.status === 204 ? getRooms() : null)
      .catch(err => console.error(err));
  }, []);

  const handleActiveChat = (id) => {

  }

  const handleJoin = async (roomId) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({roomId: roomId, userId: userId})
    };
    await fetch(`${baseUrl}parties`, requestOptions)
      .then(response => response.status === 201 ? handleToggle() : null)
      .catch(err => console.error(err));
  };

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
        <Toast.Body className='bg-white rounded rounded-bottom'>
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
            <div className="list-group">
              <div className='list-group-item list-group-item-light'>Contacts</div>
              {

              }
            </div>
            <div className="list-group">
              <div className='list-group-item list-group-item-light'>Rooms</div>
              {
                rooms && rooms.filter(r => r.parties.every(p => p.userId !== userId) && r.isPrivate === false).map((room) => {
                  return <div className='l-item list-group-item list-group-item-action d-flex justify-content-between' key={room.id}>
                    <img className='h-100' src="src/assets/add_group.png" alt="group" />
                    <div className='fs-4'>{room.name}</div>
                    <button type='button' onClick={() => handleJoin(room.id)} className='form-control btn d-flex w-auto'>
                      <img className='h-100 aling-self-center' src="src/assets/add.png" alt="add" />
                    </button>
                  </div>;
                })
              }
            </div>
          </div>
        </Toast.Body>
      </Toast>
      <div className="list-group overflow-auto h-90">
        {
          rooms && rooms.filter(r => r.parties.some(p => p.userId === userId)).map((room) => {
            return <div className={`l-item list-group-item list-group-item-light d-flex ${roomId === room.id && 'active-item'}`} key={room.id}
              onClick={() => setRoomId(room.id)} >
              <img className='h-100' src="src/assets/add_group.png" alt="group" />
              <div className='fs-4 mx-auto'>{room.name}</div>
              <OverlayTrigger
                trigger="click"
                placement="right"
                key="right"
                overlay={
                  <Popover>
                    <Popover.Body>
                      <button type="button" className='btn btn-danger' onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                    </Popover.Body>
                  </Popover>
                }>
                <button type='button' className='form-control btn d-flex w-auto'>
                  <img className='h-100 aling-self-center' src="src/assets/delete.png" alt="add" />
                </button>
              </OverlayTrigger>
            </div>;
          })
        }
      </div>
    </div >
  )
}

export default Rooms;