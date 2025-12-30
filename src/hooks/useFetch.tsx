import { useEffect, useState } from "react";
import { api } from "../service/auth";
import { AxiosError } from "axios";

interface useFetchProps {
  url: string;
  params?: string;
}

function useFetch<T>({ url, params = "" }: useFetchProps) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get<T>(`${url}${params}`, {
          signal: controller.signal,
        });
        setData(response.data);
      } catch (error) {
        if (error instanceof AxiosError && error.name === "CanceledError")
          return;
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [url, params]);
  return { data, loading, error };
}

export default useFetch;
