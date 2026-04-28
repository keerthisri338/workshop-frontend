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
    alert("Registered successfully ✅ Please login");
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
      <div style={styles.authPage}>
        <div style={styles.heroBox}>
          <h1>SkillUp Academy</h1>
          <p>
            A professional workshop platform for students to explore learning
            sessions, join meetings and manage academic events.
          </p>

          <div style={styles.heroCards}>
            <div>🎓 Expert Faculty Sessions</div>
            <div>💻 Online Workshop Access</div>
            <div>📚 Skill-Based Learning</div>
          </div>
        </div>

        <div style={styles.authCard}>
          <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>
          <p>{isRegister ? "Register to continue" : "Login to your portal"}</p>

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

          <button style={styles.primaryBtn} onClick={isRegister ? register : login}>
            {isRegister ? "Register" : "Login"}
          </button>

          <p style={styles.switchText} onClick={() => setIsRegister(!isRegister)}>
            {isRegister
              ? "Already have an account? Login"
              : "New student? Register here"}
          </p>

          <small>Demo login: admin / admin123</small>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <div style={styles.brand}>
          <span style={styles.logo}>S</span>
          <div>
            <h2>SkillUp Academy</h2>
            <p>Professional Workshop Management Portal</p>
          </div>
        </div>

        <div style={styles.navLinks}>
          <a href="#home">Home</a>
          <a href="#workshops">Workshops</a>
          <a href="#contact">Contact</a>
          <button style={styles.logout} onClick={() => setLoggedIn(false)}>
            Logout
          </button>
        </div>
      </nav>

      <section id="home" style={styles.heroSection}>
        <div>
          <h1>Upgrade Your Skills With Live Workshops</h1>
          <p>
            Join expert-led training sessions, improve your technical knowledge
            and manage all workshops in one beautiful portal.
          </p>
          <button style={styles.heroBtn}>Explore Workshops</button>
        </div>

        <div style={styles.heroImage}>
          <h2>Live Learning</h2>
          <p>Interactive sessions • Meeting links • Faculty guidance</p>
        </div>
      </section>

      <section style={styles.stats}>
        <div style={styles.statCard}>
          <h2>{workshops.length}</h2>
          <p>Workshops</p>
        </div>
        <div style={styles.statCard}>
          <h2>24/7</h2>
          <p>Learning Access</p>
        </div>
        <div style={styles.statCard}>
          <h2>100%</h2>
          <p>Student Friendly</p>
        </div>
      </section>

      <section id="workshops" style={styles.content}>
        <div style={styles.formCard}>
          <h2>Create New Workshop</h2>
          <p>Add workshop details and meeting link</p>

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

          <button style={styles.primaryBtn} onClick={addWorkshop}>
            Add Workshop
          </button>
        </div>

        <div style={styles.listCard}>
          <h2>Upcoming Workshops</h2>

          {workshops.length === 0 ? (
            <div style={styles.emptyBox}>
              <h3>No workshops available</h3>
              <p>Create your first workshop to display here.</p>
            </div>
          ) : (
            workshops.map((w) => (
              <div key={w.id} style={styles.workshopCard}>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.description}</p>
                </div>
                <a href={w.meetingLink} target="_blank" rel="noreferrer">
                  Join Now
                </a>
              </div>
            ))
          )}
        </div>
      </section>

      <footer id="contact" style={styles.footer}>
        <h3>SkillUp Academy</h3>
        <p>Empowering students through practical learning workshops.</p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f7fb",
    fontFamily: "Segoe UI, Arial, sans-serif",
    color: "#111827",
  },
  authPage: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, rgba(37,99,235,0.95), rgba(124,58,237,0.95)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200') center/cover",
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    alignItems: "center",
    gap: "40px",
    padding: "70px",
    fontFamily: "Segoe UI, Arial, sans-serif",
  },
  heroBox: {
    color: "white",
  },
  heroCards: {
    display: "grid",
    gap: "16px",
    marginTop: "30px",
    fontSize: "18px",
  },
  authCard: {
    background: "rgba(255,255,255,0.95)",
    padding: "42px",
    borderRadius: "26px",
    boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
  },
  navbar: {
    background: "white",
    padding: "18px 55px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  logo: {
    width: "48px",
    height: "48px",
    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    color: "white",
    borderRadius: "14px",
    display: "grid",
    placeItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
  },
  heroSection: {
    margin: "40px 55px",
    padding: "55px",
    borderRadius: "30px",
    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    color: "white",
    display: "grid",
    gridTemplateColumns: "1.3fr 0.7fr",
    gap: "30px",
  },
  heroImage: {
    background: "rgba(255,255,255,0.18)",
    borderRadius: "24px",
    padding: "35px",
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
    margin: "0 55px 35px",
  },
  statCard: {
    background: "white",
    padding: "28px",
    borderRadius: "22px",
    textAlign: "center",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr",
    gap: "32px",
    margin: "0 55px 45px",
  },
  formCard: {
    background: "white",
    padding: "32px",
    borderRadius: "24px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },
  listCard: {
    background: "white",
    padding: "32px",
    borderRadius: "24px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },
  input: {
    width: "100%",
    padding: "15px",
    margin: "11px 0",
    borderRadius: "14px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "15px",
    margin: "11px 0",
    borderRadius: "14px",
    border: "1px solid #d1d5db",
    minHeight: "100px",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  primaryBtn: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
  heroBtn: {
    padding: "14px 26px",
    border: "none",
    borderRadius: "14px",
    background: "white",
    color: "#2563eb",
    fontSize: "16px",
    fontWeight: "bold",
  },
  logout: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "12px",
    background: "#eef2ff",
    color: "#2563eb",
    fontWeight: "bold",
    cursor: "pointer",
  },
  workshopCard: {
    padding: "20px",
    marginBottom: "16px",
    borderRadius: "18px",
    background: "#f8fafc",
    borderLeft: "6px solid #2563eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emptyBox: {
    textAlign: "center",
    padding: "60px",
    color: "#6b7280",
  },
  footer: {
    background: "#111827",
    color: "white",
    textAlign: "center",
    padding: "30px",
  },
};

export default App;
