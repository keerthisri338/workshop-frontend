import React, { useState } from "react";
import axios from "axios";

function CreateWorkshop() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meetingLink, setMeetingLink] = useState("");

  const saveWorkshop = async () => {
    try {
      await axios.post(
        "https://workshop-backend-2kh4.onrender.com/workshops",
        {
          title: title,
          description: description
        }
      );

      alert("Workshop Created Successfully");

      setTitle("");
      setDescription("");
      setMeetingLink("");
    } catch (error) {
      console.log(error);
      alert("Save Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Workshop</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Meeting Link"
        value={meetingLink}
        onChange={(e) => setMeetingLink(e.target.value)}
      />
      <br /><br />

      <input type="file" />
      <br /><br />

      <button onClick={saveWorkshop}>Save</button>
      <button onClick={() => window.history.back()}>Back</button>
    </div>
  );
}

export default CreateWorkshop;
