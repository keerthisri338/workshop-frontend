import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [username, setUsername] = useState("");

  const [workshops, setWorkshops] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);

  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("workshops"));
    if (data) setWorkshops(data);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("workshops", JSON.stringify(workshops));
  }, [workshops]);

  // ADD WORKSHOP
  const addWorkshop = () => {
    if (!title) return;

    const newWorkshop = {
      id: Date.now(),
      title,
      desc,
      date,
      link,
      material: file ? file.name : "",
      enrolled: false,
    };

    setWorkshops([...workshops, newWorkshop]);

    setTitle("");
    setDesc("");
    setDate("");
    setLink("");
    setFile(null);
  };

  // DELETE
  const deleteWorkshop = (id) => {
    setWorkshops(workshops.filter((w) => w.id !== id));
  };

  // ENROLL
  const enrollWorkshop = (id) => {
    const updated = workshops.map((w) =>
      w.id === id ? { ...w, enrolled: !w.enrolled } : w
    );
    setWorkshops(updated);
  };

  // SEARCH FILTER
  const filtered = workshops.filter((w) =>
    w.title.toLowerCase().includes(search.toLowerCase())
  );

  // CERTIFICATE DOWNLOAD
  const downloadCertificate = (title) => {
    const content = `🎓 Certificate of Completion\n\nThis certifies that you completed "${title}" workshop successfully!`;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "certificate.txt";
    link.click();
  };

  // LOGIN PAGE
  if (page === "login") {
    return (
      <div className={dark ? "dark container" : "container"}>
        <h1>🎓 Workshop Platform</h1>

        <input
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={() => setPage("dashboard")}>Login</button>

        <p onClick={() => setPage("register")} className="link">
          Don't have an account? Register
        </p>
      </div>
    );
  }

  // REGISTER PAGE
  if (page === "register") {
    return (
      <div className={dark ? "dark container" : "container"}>
        <h1>📝 Register</h1>

        <input placeholder="Username" />
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />

        <button onClick={() => setPage("login")}>Register</button>
      </div>
    );
  }

  // DASHBOARD
  if (page === "dashboard") {
    return (
      <div className={dark ? "dark container" : "container"}>
        <h2>Welcome, {username} 👋</h2>

        <div className="nav">
          <button onClick={() => setPage("add")}>➕ Add Workshop</button>
          <button onClick={() => setPage("view")}>📚 View Workshops</button>
          <button onClick={() => setPage("stats")}>📊 Stats</button>
          <button onClick={() => setDark(!dark)}>🌙 Mode</button>
          <button onClick={() => setPage("login")}>Logout</button>
        </div>
      </div>
    );
  }

  // ADD PAGE
  if (page === "add") {
    return (
      <div className={dark ? "dark container" : "container"}>
        <h2>➕ Add Workshop</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          placeholder="Meeting Link (Zoom/Meet)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button onClick={addWorkshop}>Save</button>
        <button onClick={() => setPage("dashboard")}>Back</button>
      </div>
    );
  }

  // VIEW PAGE
  if (page === "view") {
    return (
      <div className={dark ? "dark container" : "container"}>
        <h2>📚 Workshops</h2>

        <input
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {filtered.map((w) => (
          <div key={w.id} className="card">
            <div>
              <h4>{w.title}</h4>
              <p>{w.desc}</p>
              <small>{w.date}</small>

              {w.link && (
                <p>
                  🔗{" "}
                  <a href={w.link} target="_blank" rel="noreferrer">
                    Join Session
                  </a>
                </p>
              )}

              {w.material && <p>📁 {w.material}</p>}
            </div>

            <div>
              <button onClick={() => enrollWorkshop(w.id)}>
                {w.enrolled ? "✅ Enrolled" : "Enroll"}
              </button>

              <button onClick={() => deleteWorkshop(w.id)}>❌ Delete</button>

              {w.enrolled && (
                <button onClick={() => downloadCertificate(w.title)}>
                  🎓 Certificate
                </button>
              )}
            </div>
          </div>
        ))}

        <button onClick={() => setPage("dashboard")}>Back</button>
      </div>
    );
  }

  // STATS PAGE
  if (page === "stats") {
    const enrolledCount = workshops.filter((w) => w.enrolled).length;

    return (
      <div className={dark ? "dark container" : "container"}>
        <h2>📊 Stats</h2>

        <p>Total Workshops: {workshops.length}</p>
        <p>Enrolled: {enrolledCount}</p>

        <button onClick={() => setPage("dashboard")}>Back</button>
      </div>
    );
  }
}

export default App;
