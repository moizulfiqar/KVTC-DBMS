import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mnzwlyzlevqrytlajtfc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uendseXpsZXZxcnl0bGFqdGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MDU2MjQsImV4cCI6MjA2NDA4MTYyNH0.38vdC9jonssgW29gIv34IaRraG_2z4QZcKYmSWk8DBg"
);

export default function StudentDocsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDocs = async () => {
      const { data, error } = await supabase.storage
        .from("student_docs")
        .list(`${id}/`, {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

      if (error) {
        console.error("Storage fetch error:", error.message);
      } else {
        // Get public URLs
        const urls = await Promise.all(
          data.map(async (file) => {
            const { data: urlData } = supabase.storage
              .from("student-data")
              .getPublicUrl(`${id}/${file.name}`);
            return {
              name: file.name,
              url: urlData.publicUrl,
            };
          })
        );
        setFiles(urls);
      }

      setLoading(false);
    };

    fetchDocs();
  }, [id]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>📎 Student Documents</h1>
      {loading ? (
        <p>Loading...</p>
      ) : files.length === 0 ? (
        <p>No documents found for this student.</p>
      ) : (
        files.map((file) => (
          <div key={file.name} style={{ marginBottom: "2rem" }}>
            <h3>{file.name}</h3>
            <iframe
              src={file.url}
              width="100%"
              height="500px"
              style={{ border: "1px solid #ddd" }}
            ></iframe>
          </div>
        ))
      )}
    </div>
  );
}
