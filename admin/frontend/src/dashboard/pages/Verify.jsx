import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { base_url } from '../../config/config';

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(`${base_url}/api/verify/${token}`);
        toast.success(res.data.message);
        navigate('/login');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Verifikasi gagal');
      } finally {
        setLoading(false);
      }
    };
    verifyEmail();
  }, [token, navigate]);

  return (
    <div className='min-h-screen flex justify-center items-center'>
      {loading ? <p>Verifying...</p> : <p>Verifikasi selesai. Silakan login.</p>}
    </div>
  );
};

export default Verify;
