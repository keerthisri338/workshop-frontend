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
      setError("Fill all fields");
      return;
    }

    if (users.find((u) => u.username === username)) {
      setError("User already exists");
      return;
    }

    setUsers([...users, { username, password }]);
    set
