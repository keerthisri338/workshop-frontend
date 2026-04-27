import React, { useState } from 'react';
import axios from 'axios';

export default function CreateWorkshop() {
  const [data, setData] = useState({
    title: '',
    description: '',
    date: '',
    duration: '',
    trainer: ''
  });

  const create = async () => {
    try {
      await axios.post(
        'https://workshop-backend-2kh4.onrender.com/workshops',
        data
      );
      alert("Workshop Created");
    } catch (error) {
      alert("Backend connection failed");
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Create Workshop</h2>

      <input placeholder="Title" onChange={e => setData({...data, title:e.target.value})} />
      <input placeholder="Description" onChange={e => setData({...data, description:e.target.value})} />
      <input placeholder="Date" onChange={e => setData({...data, date:e.target.value})} />
      <input placeholder="Duration" onChange={e => setData({...data, duration:e.target.value})} />
      <input placeholder="Trainer" onChange={e => setData({...data, trainer:e.target.value})} />

      <button onClick={create}>Create</button>
    </div>
  );
}
