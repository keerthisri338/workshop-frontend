import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div style={{ background: "#ddd", padding: "10px" }}>
      <Link to="/">Login</Link> | 
      <Link to="/register"> Register</Link> | 
      <Link to="/dashboard"> Dashboard</Link> | 
      <Link to="/create"> Create Workshop</Link>
    </div>
  );
}