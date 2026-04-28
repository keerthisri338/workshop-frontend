import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://workshop-backend-2kh4.onrender.com";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [registeredUser, setRegisteredUser] = useState("admin");
  const [registeredPass, setRegisteredPass] = useState("admin123");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [workshops, setWorkshops] = useState([]);

  const login = () => {
    if (username === registeredUser && password === registeredPass) {
      setLoggedIn(true);
      setUsername("");
      setPassword("");
    } else {
      alert("Wrong credentials ❌");
    }
  };

  const register = () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    setRegisteredUser(username);
    setRegisteredPass(password);
    setIsRegister(false);
    setUsername("");
    setPassword("");
    alert("Registration successful ✅ Now login");
  };

  const loadWorkshops = async () => {
    try {
      const res = await axios.get(`${API}/workshops`);
      setWorkshops(res.data);
    } catch (err) {
      console.log(err);
      alert("Backend not connected");
    }
  };

  const addWorkshop = async () => {
    if (!title || !description || !meetingLink) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(`${API}/workshops`, {
        title,
        description,
        meetingLink,
      });

      alert("Workshop Added Successfully ✅");
      setTitle("");
      setDescription("");
      setMeetingLink("");
      loadWorkshops();
    } catch (err) {
      console.log(err);
      alert("Failed to add workshop");
    }
  };

  useEffect(() => {
    if (loggedIn) loadWorkshops();
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.leftBox}>
          <h1>Workshop Management System</h1>
          <p>
            A modern React + Spring Boot application for managing workshops,
            meeting links and training sessions.
          </p>
          <div style={styles.features}>
            <span>✔ React Frontend</span>
            <span>✔ Spring Boot Backend</span>
            <span>✔ Render Deployment</span>
            <span>✔ REST API Integration</span>
          </div>
        </div>

        <div style={styles.loginCard}>
          <h1 style={styles.logo}>{isRegister ? "Create Account" : "Login"}</h1>
          <p style={styles.subtitle}>
            {isRegister
              ? "Register new user credentials"
              : "Enter credentials to continue"}
          </p>

          <input
            style={styles.input}
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} onClick={isRegister ? register : login}>
            {isRegister ? "Register" : "Login"}
          </button>

          <p style={styles.linkText} onClick={() => setIsRegister(!isRegister)}>
            {isRegister
              ? "Already have an account? Login"
              : "New user? Register here"}
          </p>

          <p style={styles.hint}>Default: admin / admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <div>
          <h2>Workshop Portal</h2>
          <p>Frontend connected with deployed backend</p>
        </div>

        <button style={styles.logout} onClick={() => setLoggedIn(false)}>
          Logout
        </button>
      </nav>

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h2>{workshops.length}</h2>
          <p>Total Workshops</p>
        </div>
        <div style={styles.statCard}>
          <h2>Live</h2>
          <p>Backend Status</p>
        </div>
        <div style={styles.statCard}>
          <h2>Render</h2>
          <p>Deployment</p>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.formCard}>
          <h2>Add New Workshop</h2>
          <p style={styles.smallText}>Create workshop and store it in backend</p>

          <input
            style={styles.input}
            placeholder="Workshop Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            style={styles.textarea}
            placeholder="Workshop Description"
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
          <h2>Available Workshops</h2>

          {workshops.length === 0 ? (
            <div style={styles.empty}>
              <h3>No workshops found</h3>
              <p>Add your first workshop from the form.</p>
            </div>
          ) : (
            workshops.map((w) => (
              <div style={styles.workshopCard} key={w.id}>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.description}</p>
                </div>

                <a
                  style={styles.joinBtn}
                  href={w.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                >
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
    background: "linear-gradient(135deg, #1e1b4b, #4f46e5, #9333ea)",
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    alignItems: "center",
    padding: "60px",
    fontFamily: "Arial",
    color: "white",
  },
  leftBox: {
    padding: "40px",
  },
  features: {
    display: "grid",
    gap: "12px",
    marginTop: "25px",
    fontSize: "18px",
  },
  loginCard: {
    background: "white",
    color: "#111827",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
  },
  logo: {
    color: "#4f46e5",
    marginBottom: "5px",
  },
  subtitle: {
    color: "#6b7280",
  },
  page: {
    minHeight: "100vh",
    background: "#eef2ff",
    fontFamily: "Arial",
  },
  navbar: {
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "white",
    padding: "25px 45px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
    padding: "30px 45px",
  },
  statCard: {
    background: "white",
    padding: "25px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr",
    gap: "30px",
    padding: "0 45px 45px",
  },
  formCard: {
    background: "white",
    padding: "30px",
    borderRadius: "22px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  list: {
    background: "white",
    padding: "30px",
    borderRadius: "22px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  input: {
    width: "100%",
    padding: "14px",
    margin: "10px 0",
    borderRadius: "12px",
    border: "1px solid #c7d2fe",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "14px",
    margin: "10px 0",
    borderRadius: "12px",
    border: "1px solid #c7d2fe",
    fontSize: "15px",
    minHeight: "90px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
  logout: {
    padding: "12px 22px",
    background: "white",
    color: "#4f46e5",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  workshopCard: {
    background: "#f8fafc",
    padding: "20px",
    marginBottom: "16px",
    borderRadius: "18px",
    borderLeft: "6px solid #4f46e5",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  joinBtn: {
    background: "#4f46e5",
    color: "white",
    padding: "10px 16px",
    borderRadius: "10px",
    textDecoration: "none",
  },
  empty: {
    textAlign: "center",
    padding: "50px",
    color: "#6b7280",
  },
  smallText: {
    color: "#6b7280",
  },
  hint: {
    fontSize: "13px",
    color: "#6b7280",
    textAlign: "center",
  },
  linkText: {
    color: "#4f46e5",
    cursor: "pointer",
    textAlign: "center",
    fontWeight: "bold",
  },
};

export default App;
