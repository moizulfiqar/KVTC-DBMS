import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// 🔐 Supabase config (can also be loaded from .env.local)
const supabase = createClient(
  "https://mnzwlyzlevqrytlajtfc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uendseXpsZXZxcnl0bGFqdGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MDU2MjQsImV4cCI6MjA2NDA4MTYyNH0.38vdC9jonssgW29gIv34IaRraG_2z4QZcKYmSWk8DBg"
);

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase
      .from("Students")
      .select("*")
      .ilike("name", `%${searchTerm}%`);

    if (error) {
      console.error("Supabase error:", error.message);
      setErrorMsg("Error fetching students.");
      setResults([]);
    } else {
      setResults(data || []); // fallback to empty array
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>📘 Student Document Finder</h1>
      <input
        type="text"
        placeholder="Enter student name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "0.5rem",
          width: "300px",
          marginRight: "1rem",
        }}
      />
      <button onClick={handleSearch} style={{ padding: "0.5rem 1rem" }}>
        Search
      </button>

      {loading && <p>🔍 Searching...</p>}
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <div style={{ marginTop: "2rem" }}>
        {Array.isArray(results) && results.length > 0 ? (
          results.map((student) => (
            <div key={student.id} style={{ marginBottom: "1rem" }}>
              <a
                href={`/students/${student.id}`}
                style={{
                  textDecoration: "none",
                  color: "blue",
                  fontWeight: "bold",
                }}
              >
                {student.full_name}
              </a>
              <br />
              <small>{student.email}</small>
            </div>
          ))
        ) : (
          !loading && <p>No students found.</p>
        )}
      </div>
    </div>
  );
}
