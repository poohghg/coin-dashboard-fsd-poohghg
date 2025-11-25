import { useEffect, useState } from 'react';

const useFetch = <T>(fetchFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await fetchFn();
        setData(data);
      } catch (e) {
        const error = e as Error;
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [fetchFn]);

  return {
    data,
    loading,
    error,
  };
};

interface User {
  id: string;
  name: string;
  age: number;
}

const useFetchUser = ({ filter, page, sortBy }: { filter: string; sortBy: string; page: number }) => {
  const getTest = async (id: string) => {
    return (await fetch(`/api/user/${id}`).then(response => response.json())) as Promise<User>;
  };

  useFetch(async () => await getTest('123'));
};

export const Test = () => {};
