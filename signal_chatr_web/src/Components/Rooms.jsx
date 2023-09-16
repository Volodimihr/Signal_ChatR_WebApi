import React, { useEffect } from 'react'

export default function Rooms({rooms}) {
  useEffect(() => {}, [rooms]);
  return (
    <div className='rooms w-25 bg-white'>
      {console.log(rooms)}
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
