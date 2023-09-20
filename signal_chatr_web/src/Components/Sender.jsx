import React, { useEffect } from 'react'
import { useCallback } from 'react';
import { useState } from 'react'

export default function Sender({ baseUrl, userId, roomId }) {

  const [msg, setMsg] = useState({
    roomId: roomId,
    userId: userId,
    msgText: '',
    msgFilePath: null,
    msgFileMime: null
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value === '' ? null : event.target.value;
    setMsg(values => ({ ...values, [name]: value }));
  };

  const sendMsg = async (e) => {
    e.preventDefault();
    if (roomId !== 0) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      };
      await fetch(`${baseUrl}Messages`, requestOptions)
        .then(response => response.status === 201 ? null : null)
        .catch(err => console.error(err));
    }
    setMsg({ ...msg, msgText: '' });
    console.log(msg);
  };

  useEffect(() => {
    setMsg({ ...msg, roomId: roomId });
  }, [roomId]);

  return (
    <div className='sender d-flex flex-column '>
      <form onSubmit={sendMsg} className='h-100 w-100 d-flex align-items-center flex-fill' method="post">
        <div className='form-group mx-3 d-flex flex-column'>
          <div>File</div>
          <div>Audio</div>
          <div>Video</div>
        </div>
        <div className='form-group'>
          <textarea type="text" name="msgText" id="msgText"
            className='form-control' rows='2' cols='222'
            spellCheck={true} placeholder='Message...' value={msg.msgText} onChange={handleChange} />
        </div>
        <div className="form-group mx-3">
          <input type="submit" name='submit' className='btn btn-warning border border-3' value='Send' />
        </div>
      </form>
    </div>
  )
}
