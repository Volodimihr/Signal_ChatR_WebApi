import React, { useEffect } from 'react'
import { useCallback } from 'react';
import { useState } from 'react'

export default function Sender({ userId, roomId }) {

  const [msg, setMsg] = useState({
    roomId: roomId,
    userId: userId,
    msgText: null,
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
    setMsg({...msg, roomId: roomId});
    console.log(msg);
  };

  useEffect(() => {
    console.log(msg);
  }, [roomId]);

  return (
    <div className='sender d-flex flex-column '>
      <form onSubmit={sendMsg} className='h-100 w-100 d-flex align-items-center flex-fill' method="post">
        <div className='d-flex flex-column'>
          <div>File</div>
          <div>Audio</div>
          <div>Video</div>
        </div>
        <div className='form-group'>
          <textarea type="text" name="msgText" id="msgText"
            className='form-control' rows='2' cols='222'
            spellCheck={true} placeholder='Message...' onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="submit" name='submit' className='btn btn-info' value='Send' />
        </div>
      </form>
    </div>
  )
}
