import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function UploadPage() {
  const [studentId, setStudentId] = useState('');
  const [gradesheet, setGradesheet] = useState(null);
  const [certificate, setCertificate] = useState(null);

  const uploadFile = async (file, path) => {
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(path, file, { upsert: true });

    if (error) {
      console.error(error);
      return null;
    }

    const { publicUrl } = supabase.storage.from('documents').getPublicUrl(path);
    return publicUrl;
  };

  const handleUpload = async () => {
    if (gradesheet) {
      const url = await uploadFile(gradesheet, `${studentId}/gradesheet.pdf`);
      await supabase.from('gradesheets').insert({ student_id: studentId, file_url: url });
    }

    if (certificate) {
      const url = await uploadFile(certificate, `${studentId}/certificate.pdf`);
      await supabase.from('certificates').insert({ student_id: studentId, file_url: url });
    }

    alert('Uploaded successfully');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Upload Documents</h1>
      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="border p-2 mb-2 block"
      />

      <div className="mb-2">
        <label>MTR (PDF):</label>
        <input type="file" onChange={(e) => setGradesheet(e.target.files[0])} />
      </div>

      <div className="mb-2">
        <label>PDR (PDF):</label>
        <input type="file" onChange={(e) => setCertificate(e.target.files[0])} />
      </div>

      <button onClick={handleUpload} className="bg-green-600 text-white px-4 py-2">
        Upload
      </button>
    </div>
  );
}
