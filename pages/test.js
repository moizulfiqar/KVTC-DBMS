// pages/test.js
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TestPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase
        .from('Students')
        .select('name')
        .order('name', { ascending: true });

      if (error) setError(error.message);
      else setStudents(data);

      setLoading(false);
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Students</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <ul className="list-disc pl-6">
        {students.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
}
