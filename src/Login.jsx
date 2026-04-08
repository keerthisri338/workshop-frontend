import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const login = async () => {
    const res = await axios.post('http://localhost:8080/login', data);
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate('/dashboard');
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setData({ ...data, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setData({ ...data, password: e.target.value })} />
      <button onClick={login}>Login</button>
    </div>
  );
}