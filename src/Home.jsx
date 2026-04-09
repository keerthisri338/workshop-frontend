import { useEffect, useState } from "react";

function Home() {
  const [view, setView] = useState("list");
  const [title, setTitle] = useState("");
  const [workshops, setWorkshops] = useState([]);

  const BASE_URL = "http://localhost:9091"; 
  // 👉 change to Render URL after deploy

  // Load workshops
  const loadWorkshops = () => {
    fetch(`${BASE_URL}/workshops`)
      .then((res) => res.json())
      .then((data) => setWorkshops(data));
  };

  useEffect(() => {
    loadWorkshops();
  }, []);

  // Add workshop
  const addWorkshop = () => {
    if (!title) {
      alert("Enter workshop name");
      return;
    }

    fetch(`${BASE_URL}/workshops`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Workshop Added!");
        setTitle("");
        loadWorkshops();
        setView("list");
      });
  };

  // Delete workshop
  const deleteWorkshop = (id) => {
    fetch(`${BASE_URL}/workshops/${id}`, {
      method: "DELETE",
    }).then(() => {
      alert("Deleted!");
      loadWorkshops();
    });
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={() => setView("add")}>Add Workshop</button>
      <button onClick={() => setView("list")}>View Workshops</button>

      <hr />

      {/* ADD VIEW */}
      {view === "add" && (
        <div>
          <h3>Add Workshop</h3>

          <input
            type="text"
            placeholder="Enter workshop name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <br /><br />

          <button onClick={addWorkshop}>Save</button>
        </div>
      )}

      {/* LIST VIEW */}
      {view === "list" && (
        <div>
          <h3>All Workshops</h3>

          {workshops.length === 0 ? (
            <p>No workshops found</p>
          ) : (
            workshops.map((w) => (
              <div key={w.id}>
                <b>{w.title}</b>
                <button onClick={() => deleteWorkshop(w.id)}>
                  Delete
                </button>
                <hr />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Home;