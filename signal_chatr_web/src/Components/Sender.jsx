import React, { useEffect, useRef, useState } from 'react'
import { useCallback } from 'react';

export default function Sender({ baseUrl, userId, roomId, conn }) {

  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const [msg, setMsg] = useState({
    roomId: roomId,
    userId: userId,
    msgText: '',
    msgFilePath: null,
    msgFileMime: null
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setMsg(values => ({ ...values, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file === undefined) {
      setMsg({ ...msg, msgFilePath: '', msgFileMime: '' });
    }
    else {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setMsg({ ...msg, msgFilePath: file.name+','+reader.result, msgFileMime: file.type })
      };
      reader.onerror = (err) => { console.log(err); };
    }
  }

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

    conn.invoke('Broadcast', 'messages')
    .catch((err) => console.error(err))

    setMsg({ ...msg, roomId: roomId,
      userId: userId,
      msgText: '',
      msgFilePath: null,
      msgFileMime: null});
  };

  useEffect(() => {
    setMsg({ ...msg, roomId: roomId });
  }, [roomId]);

  useEffect(() => { console.log(msg); }, [msg]);

  return (
    <div className='sender d-flex flex-column '>
      <form onSubmit={sendMsg} className='h-100 w-100 d-flex align-items-center flex-fill'
        method="post" encType='multipart/form-data'>
        <div className='form-group mx-3 d-flex flex-column h-100'>
          <button type="button" className='btn d-flex h-33 justify-content-center align-items-center' title='Upload' onClick={handleClick}>
            <img className='object-fit-contain h-100' src="src/assets/upload.png" alt="Upload" />
          </button>
          <input type="file" style={{ display: 'none' }} ref={hiddenFileInput} name='file' onChange={handleFileChange} title='Upload' className='form-control' />
          <button type="button" className='btn d-flex h-33 justify-content-center align-items-center' title='Audio message'>
            <img className='object-fit-contain h-100' src="src/assets/microphone.png" alt="Audio" />
          </button>
          <button type="button" className='btn d-flex h-33 justify-content-center align-items-center' title='Video message'>
            <img className='object-fit-contain h-100' src="src/assets/video_chat.png" alt="Video" />
          </button>
        </div>
        <div className='form-group'>
          <textarea type="text" name="msgText" id="msgText"
            className='form-control' rows='3' cols='222'
            spellCheck={true} placeholder='Message...' value={msg.msgText} onChange={handleChange} />
        </div>
        <div className="form-group mx-3">
          <input type="submit" name='submit' className='btn btn-warning border border-3' value='Send' />
        </div>
      </form>
    </div>
  )
}
