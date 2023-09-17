import React, { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';

export default function Rooms({ rooms }) {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  useEffect(() => { }, [rooms]);
  return (
    <div className='rooms w-25 bg-white'>
      {console.log(rooms)}
      <div className='rounded border d-flex justify-content-around align-items-middle'>
        <div className='my-auto fs-4'>Start chating</div>
        <button type='button' className='btn fs-3' onClick={handleToggle}>+</button>
      </div>
      <Toast className='w-100' show={show} onClose={handleToggle}>
        <Toast.Header className='d-flex justify-content-between'>
          <button type='button' className='btn border add-group-img'>
            <img className='h-100' src="src/assets/add_group.png" alt="" />
            <span className='ms-2'>New Room</span>
          </button>
          <button type='button' className='btn border add-group-img'>
            <img className='h-100' src="src/assets/chat.png" alt="" />
            <span className='ms-2'>New Chat</span>
          </button>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
      <div className="list-group">
        {
          rooms && rooms.map((room) => {
            return <div className='list-group-item' key={room.id}>{room.name}</div>
          })
        }
      </div>
    </div>
  )
}
