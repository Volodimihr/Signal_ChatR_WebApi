import React, { useState } from 'react'

export default function Message({ msg, userId, users }) {

  let msgFile = (
    <div></div>
  );

  let b64;
  let ext;

  if (msg.msgFilePath !== null) {
    b64 = `data:${msg.msgFileMime};base64,${msg.msgFilePath.split('.')[0]}`;
    ext = msg.msgFilePath.split('.')[1];
  }

  const handleDownloadFile = () => {
    const downloadLink = document.createElement('a');
    const fileName = msg.sentAt + '.' + ext;
    downloadLink.href = b64;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  if (msg.msgFilePath !== null) {
    if (msg.msgFileMime.includes('image')) {
      msgFile = (
        <div className='d-flex flex-column '>
          <img className='msg-img' src={b64} alt="paint" />
          <button type="button" onClick={handleDownloadFile} className='btn btn-light ms-auto'>Download</button>
        </div>
      );
    }
    else {
      msgFile = (
        <div className='d-flex flex-column '>
          <button type="button" onClick={handleDownloadFile} className='btn btn-light ms-auto'>Download file</button>
        </div>
      );
    }
  }

  return (
    <div className={`w-75 mb-2 p-2 rounded border border-2 ${msg.userId === userId
      ? 'ms-auto text-end bg-pr' : 'me-auto bg-bw'}`}>
      <div className={`d-flex ${msg.userId === userId ? 'flex-row-reverse' : ''} mx-1`}>
        <img className='msg-avatar object-fit-contain' src={(users.find(u => u.id === msg.userId)).avatarPath} alt="avatar" />
        <div>
          {
            msg.msgFilePath !== null &&
            msgFile
          }
          <pre className='fs-5 mx-3 flex-grow-1'>{msg.msgText}</pre>
        </div>
      </div>
    </div>
  )
}
