import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(url, options);
        setData(response.data);
      } catch (err) {
        setError(err);
        if (!options.silent) {
          toast.error(err.response?.data?.message || 'Failed to fetch data');
        }
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error, refetch: () => fetchData() };
};