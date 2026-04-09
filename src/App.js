import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const [workshops, setWorkshops] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);

  // LOAD USERS
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users"));
    if (data) setUsers(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // LOAD WORKSHOPS
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("workshops"));
    if (data) setWorkshops(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("workshops", JSON.stringify(workshops));
  }, [workshops]);

  // REGISTER
  const handleRegister = () => {
    if (!username || !password) {
      setError("⚠ Fill all fields");
      return;
    }

    if (users.find((u) => u.username === username)) {
      setError("⚠ User already exists");
      return;
    }

    setUsers([...users, { username, password }]);
    setError("✅ Registered successfully");
    setPage("login");
  };

  // LOGIN
  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      setError("❌ Wrong username or password");
      return;
    }

    setError("");
    setPage("dashboard");
  };

  // UPDATE PASSWORD
  const updatePassword = () => {
    const updated = users.map((u) =>
      u.username === username ? { ...u, password } : u
    );

    setUsers(updated);
    setError("✅ Password updated");
  };

  // ADD WORKSHOP
  const addWorkshop = () => {
    if (!title) {
      setError("⚠ Title required");
      return;
    }

    const newWorkshop = {
      title,
      desc,
      link,
      file: file ? URL.createObjectURL(file) : null,
      enrolled: false,
    };

    setWorkshops([...workshops, newWorkshop]);
    setTitle("");
    setDesc("");
    setLink("");
    setFile(null);
  };

  // DELETE
  const deleteWorkshop = (i) => {
    setWorkshops(workshops.filter((_, index) => index !== i));
  };

  // ENROLL
  const enrollWorkshop = (i) => {
    const updated = [...workshops];
    updated[i].enrolled = !updated[i].enrolled;
    setWorkshops(updated);
  };

  // LOGIN PAGE
  if (page === "login") {
    return (
      <div className="container">
        <h1>🎓 Workshop Platform</h1>

        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleLogin}>Login</button>

        <p className="link" onClick={() => setPage("register")}>
          Register
        </p>

        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  // REGISTER
  if (page === "register") {
    return (
      <div className="container">
        <h1>📝 Register</h1>

        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleRegister}>Register</button>

        <button onClick={() => setPage("login")}>Back</button>

        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  // DASHBOARD
  if (page === "dashboard") {
    return (
      <div className="container">
        <h2>Welcome {username} 👋</h2>

        <div className="nav">
          <button onClick={() => setPage("add")}>➕ Add</button>
          <button onClick={() => setPage("view")}>📚 View</button>
          <button onClick={() => setPage("update")}>🔐 Update Password</button>
          <button onClick={() => setPage("login")}>Logout</button>
        </div>
      </div>
    );
  }

  // UPDATE PASSWORD PAGE
  if (page === "update") {
    return (
      <div className="container">
        <h2>🔐 Update Password</h2>

        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={updatePassword}>Update</button>
        <button onClick={() => setPage("dashboard")}>Back</button>

        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  // ADD PAGE
  if (page === "add") {
    return (
      <div className="container">
        <h2>Add Workshop</h2>

        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <input placeholder="Meeting Link" value={link} onChange={(e) => setLink(e.target.value)} />

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button onClick={addWorkshop}>Save</button>
        <button onClick={() => setPage("dashboard")}>Back</button>

        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  // VIEW PAGE
  if (page === "view") {
    return (
      <div className="container">
        <h2>Workshops</h2>

        {workshops.map((w, i) => (
          <div key={i} className="card">
            <h4>{w.title}</h4>
            <p>{w.desc}</p>

            {w.link && (
              <a href={w.link} target="_blank" rel="noreferrer">
                🎥 Join Session
              </a>
            )}

            {w.file && (
              <a href={w.file} target="_blank" rel="noreferrer">
                📄 View PDF
              </a>
            )}

            <div>
              <button onClick={() => enrollWorkshop(i)}>
                {w.enrolled ? "✅ Enrolled" : "Enroll"}
              </button>

              <button onClick={() => deleteWorkshop(i)}>❌</button>
            </div>
          </div>
        ))}

        <button onClick={() => setPage("dashboard")}>Back</button>
      </div>
    );
  }
}

export default App;
