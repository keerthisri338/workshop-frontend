import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    const res = await axios.get('http://localhost:8080/workshops');
    setWorkshops(res.data);
  };

  const enroll = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    await axios.post('http://localhost:8080/enroll', {
      userId: user.id,
      workshopId: id
    });
    alert("Enrolled Successfully");
  };

  return (
    <div>
      <h2>Workshops</h2>
      {workshops.map(w => (
        <div key={w.id}>
          <h3>{w.title}</h3>
          <p>{w.description}</p>
          <button onClick={() => enroll(w.id)}>Enroll</button>
        </div>
      ))}
    </div>
  );
}