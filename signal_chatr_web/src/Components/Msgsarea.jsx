import React from 'react'

export default function Msgsarea({ msgs, userId }) {

  return (
    <div className='msgsarea'>
      <div className='d-flex flex-column-reverse w-100 h-100 overflow-auto'>
        {
          msgs = msgs && msgs.sort((fItem, sItem) => sItem.sentAt > fItem.sentAt ? 1 : -1)
            .map((msg) => {
              return <div key={msg.sentAt}
                className={`w-75 mb-2 p-2 rounded border border-2 ${msg.userId === userId ? 'ms-auto text-end bg-pr' : 'me-auto bg-bw'}`}>
                <pre className='fs-5'>{msg.msgText}</pre>
              </div>
            })}
      </div>
    </div>
  )
}
