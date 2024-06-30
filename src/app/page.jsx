'use client'

import { useState } from "react";
import axios from 'axios';

export default function Home() {
  const [file, setFile] = useState(null);
  const [png, setPng] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files[0]) setFile(event.target.files[0]);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (!file) return alert('No file selected!')
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
      })

      const img_url = URL.createObjectURL(response.data);
      setPng(img_url);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main>
      <form onSubmit={submitForm}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
      
      {file && <img width={256} style={{objectFit: 'contain'}} src={URL.createObjectURL(file)} alt="Original File"/>}
      {png && <img width={256} style={{objectFit: 'contain'}} src={png} alt="Processed File"/>}
    </main>
  );
}
