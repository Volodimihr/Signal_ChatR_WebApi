import React from 'react'

export default function Msgsarea({ msgs, userId }) {

  return (
    <div className='msgsarea'>
      <div className='d-flex flex-column-reverse w-100 h-100 overflow-auto'>
        {
          msgs = msgs && msgs.sort((fItem, sItem) => sItem.sentAt > fItem.sentAt ? 1 : -1)
            .map((msg) => {
              return <div key={msg.sentAt}
                className={`bg-info w-50 mb-2 p-2 rounded ${msg.userId === userId ? 'ms-auto' : 'me-auto'}`}>
                <div>{msg.msgText}</div>
              </div>
            })}
      </div>
    </div>
  )
}
