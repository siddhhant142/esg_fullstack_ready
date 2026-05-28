import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  // FETCH DATA
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/records/")
      .then((res) => setRecords(res.data))
      .catch((err) => console.log(err));
  }, []);

  // FILTER + SEARCH LOGIC
  const filtered = records.filter((r) => {
    const matchFilter =
      filter === "ALL"
        ? true
        : filter === "SUSPICIOUS"
        ? r.suspicious
        : !r.suspicious;

    const matchSearch = r.activity
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  // KPI CALCULATION
  const stats = {
    total: filtered.length,
    suspicious: filtered.filter((r) => r.suspicious).length,
    approved: filtered.filter((r) => !r.suspicious).length,
    emissions: filtered.reduce((sum, r) => sum + r.co2e, 0),
  };

  return (
    <div className="container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>ESG CONTROL</h2>

        <p onClick={() => setFilter("ALL")}>📊 All Records</p>
        <p onClick={() => setFilter("SUSPICIOUS")}>⚠️ Suspicious</p>
        <p onClick={() => setFilter("APPROVED")}>✅ Approved</p>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* HEADER */}
        <div style={{ marginBottom: "18px" }}>
          <h1>ESG Intelligence Platform</h1>
          <p style={{ color: "#9ca3af", marginTop: "-10px" }}>
            Real-time emissions monitoring & audit system
          </p>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search activity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* KPI CARDS */}
        <div className="cards">

          <div className="card">
            <h3>{stats.total}</h3>
            <p>Active Dataset</p>
          </div>

          <div className="card">
            <h3>{stats.suspicious}</h3>
            <p>Flagged Anomalies</p>
          </div>

          <div className="card">
            <h3>{stats.approved}</h3>
            <p>Approved Records</p>
          </div>

          <div className="card">
            <h3>{stats.emissions}</h3>
            <p>Total CO2e</p>
          </div>

        </div>

        {/* TABLE */}
        <div className="table">

          <table>

            <thead>
              <tr>
                <th>Activity</th>
                <th>Scope</th>
                <th>Unit</th>
                <th>CO2e</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((r, i) => (
                <tr
                  key={i}
                  onClick={() => setSelected(r)}
                  style={{
                    background:
                      selected === r ? "#0f172a" : "transparent",
                  }}
                >
                  <td>{r.activity}</td>
                  <td>{r.scope}</td>
                  <td>{r.unit}</td>
                  <td>{r.co2e}</td>
                  <td>
                    <span
                      className={`badge ${
                        r.suspicious ? "yellow" : "green"
                      }`}
                    >
                      {r.suspicious ? "SUSPICIOUS" : "APPROVED"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}