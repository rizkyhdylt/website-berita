import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../../config/config';

const Opini = () => {
  const { id } = useParams();
  const [opini, setOpini] = useState(null);
  const token = localStorage.getItem("newsToken");

  useEffect(() => {
    axios.get(`${base_url}/api/opini/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setOpini(res.data))
    .catch(err => console.error(err));
  }, [id]);

  if (!opini) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-3">{opini.judul}</h1>
      <p className="text-gray-500 mb-2">
        Oleh: {opini.nama} ({opini.email})
      </p>
      <p className="text-gray-700 mb-4">{opini.isi}</p>
      {opini.foto && <img src={opini.foto} alt="opini" className="max-w-sm rounded-md" />}
    </div>
  );
};


export default Opini;
