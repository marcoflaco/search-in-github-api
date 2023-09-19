import { useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';

export default function useRepositories() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchRepositories = useCallback(async (term, sort = 'stars') => {
    setError(null);
    setIsLoading(true);

    try {
      const url = BASE_URL.replace('QUERY', term).replace('SORT', sort);
      const result = await axios.get(url);
      setData(result.data.items);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return  {
    repositories: data,
    error,
    isLoading,
    fetchRepositories,
  }
}