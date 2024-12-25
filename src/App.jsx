import React, { useState, useEffect } from "react";
import ProjectTable from "./components/ProjectTable";
import "./styles/App.css";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
      );
      const data = await response.json();
      setProjects(data || []);
      setLoading(false);
    } catch {
      setError("Failed to fetch data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">Kickstarter Projects</h1>
      {loading && <div className="loader">Loading...</div>}
      {error && (
        <div className="error-container">
          <p>{error}</p>
          <button onClick={fetchProjects} className="retry-button">
            Retry
          </button>
        </div>
      )}
      {!loading && !error && projects.length === 0 && (
        <div className="no-data">No projects to display.</div>
      )}
      {!loading && !error && projects.length > 0 && (
        <ProjectTable projects={projects} />
      )}
    </div>
  );
};

export default App;
