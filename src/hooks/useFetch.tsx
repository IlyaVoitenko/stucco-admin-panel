import { useEffect, useState } from "react";
import { api } from "../service/auth";

interface useFetchProps {
  url: string;
}

function useFetch<T>({ url }: useFetchProps) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const response = await api.get<T>(url);
        if (!cancelled) setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [url]);
  return { data, loading, error };
}

export default useFetch;
