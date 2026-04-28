import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://workshop-backend-2kh4.onrender.com";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [workshops, setWorkshops] = useState([]);

  const login = () => {
    if (username === "admin" && password === "admin123") {
      setLoggedIn(true);
    } else {
      alert("Invalid login. Use admin / admin123");
    }
  };

  const loadWorkshops = async () => {
    try {
      const res = await axios.get(`${API}/workshops`);
      setWorkshops(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addWorkshop = async () => {
    try {
      await axios.post(`${API}/workshops`, {
        title,
        description,
        meetingLink,
      });

      alert("Workshop Added Successfully");
      setTitle("");
      setDescription("");
      setMeetingLink("");
      loadWorkshops();
    } catch (err) {
      alert("Failed to add workshop");
      console.log(err);
    }
  };

  useEffect(() => {
    if (loggedIn) loadWorkshops();
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginCard}>
          <h1 style={styles.logo}>Workshop Portal</h1>
          <p style={styles.subtitle}>Login to manage workshops</p>

          <input
            style={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} onClick={login}>
            Login
          </button>

          <p style={styles.hint}>Username: admin | Password: admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h2>Workshop Management</h2>
        <button style={styles.logout} onClick={() => setLoggedIn(false)}>
          Logout
        </button>
      </nav>

      <div style={styles.container}>
        <div style={styles.formCard}>
          <h2>Add New Workshop</h2>

          <input
            style={styles.input}
            placeholder="Workshop Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Meeting Link"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
          />

          <button style={styles.button} onClick={addWorkshop}>
            Add Workshop
          </button>
        </div>

        <div style={styles.list}>
          <h2>All Workshops</h2>

          {workshops.length === 0 ? (
            <p>No workshops found</p>
          ) : (
            workshops.map((w) => (
              <div style={styles.workshopCard} key={w.id}>
                <h3>{w.title}</h3>
                <p>{w.description}</p>
                <a href={w.meetingLink} target="_blank" rel="noreferrer">
                  Join Meeting
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  loginPage: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
  },
  loginCard: {
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },
  logo: {
    color: "#4f46e5",
  },
  subtitle: {
    color: "#666",
  },
  page: {
    minHeight: "100vh",
    background: "#f4f7fb",
    fontFamily: "Arial",
  },
  navbar: {
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "white",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    gap: "30px",
    padding: "40px",
  },
  formCard: {
    background: "white",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  input: {
    width: "100%",
    padding: "13px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  button: {
    width: "100%",
    padding: "13px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
  logout: {
    padding: "10px 18px",
    background: "white",
    color: "#4f46e5",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  list: {
    background: "white",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  workshopCard: {
    background: "#f9fafb",
    padding: "18px",
    marginBottom: "15px",
    borderRadius: "14px",
    borderLeft: "5px solid #4f46e5",
  },
  hint: {
    fontSize: "13px",
    color: "#777",
    marginTop: "15px",
  },
};

export default App;
