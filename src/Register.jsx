import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const register = async () => {
    await axios.post('http://localhost:8080/register', data);
    alert("Registered Successfully");
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setData({ ...data, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setData({ ...data, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setData({ ...data, password: e.target.value })} />
      <button onClick={register}>Register</button>
    </div>
  );
}