import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const API = "https://workshop-backend-2kh4.onrender.com";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [workshops, setWorkshops] = useState([]);

  const loadWorkshops = async () => {
    try {
      const res = await axios.get(`${API}/workshops`);
      setWorkshops(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addWorkshop = async () => {
    try {
      await axios.post(`${API}/workshops`, {
        title: title,
        description: description,
        meetingLink: meetingLink
      });

      setTitle("");
      setDescription("");
      setMeetingLink("");

      loadWorkshops();
      alert("Workshop Added Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  useEffect(() => {
    loadWorkshops();
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Workshop Management</h1>

      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Enter Meeting Link"
        value={meetingLink}
        onChange={(e) => setMeetingLink(e.target.value)}
      />
      <br /><br />

      <button onClick={addWorkshop}>Add Workshop</button>

      <hr />

      <h2>All Workshops</h2>

      {workshops.length === 0 ? (
        <p>No Data Found</p>
      ) : (
        workshops.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a href={item.meetingLink} target="_blank" rel="noreferrer">
              Join Meeting
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
