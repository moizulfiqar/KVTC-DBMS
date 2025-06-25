import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function StudentPage() {
  const { query } = useRouter();
  const { id } = query;

  const [student, setStudent] = useState(null);
  const [gradesheets, setGradesheets] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data: studentData } = await supabase
        .from('students')
        .select('*')
        .eq('id', id)
        .single();
      const { data: grades } = await supabase
        .from('gradesheets')
        .select('*')
        .eq('student_id', id);
      const { data: certs } = await supabase
        .from('certificates')
        .select('*')
        .eq('student_id', id);

      setStudent(studentData);
      setGradesheets(grades);
      setCertificates(certs);
    })();
  }, [id]);

  if (!student) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{student.full_name}</h1>

      <h2 className="mt-6 font-semibold">Gradesheets</h2>
      {gradesheets.map((g) => (
        <iframe key={g.id} src={g.file_url} className="w-full h-[400px] my-4" />
      ))}

      <h2 className="mt-6 font-semibold">Certificates</h2>
      {certificates.map((c) => (
        <iframe key={c.id} src={c.file_url} className="w-full h-[400px] my-4" />
      ))}
    </div>
  );
}
