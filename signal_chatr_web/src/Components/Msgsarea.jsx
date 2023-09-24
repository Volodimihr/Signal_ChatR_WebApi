import React from 'react'
import Message from './Message';

export default function Msgsarea({ msgs, userId, users }) {

  return (
    <div className='msgsarea'>
      <div className='d-flex flex-column-reverse w-100 h-100 overflow-auto'>
        {
          msgs = msgs && msgs.sort((fItem, sItem) => sItem.sentAt > fItem.sentAt ? 1 : -1)
            .map((msg) => {
              return <Message key={msg.sentAt} msg={msg} userId={userId} users={users} /> 
            })}
      </div>
    </div>
  )
}
