// utils/hooks/useApi.js
import { useState, useEffect } from "react";

export const useApi = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Could not find word definition");
        }
        const result = await response.json();
        setData(result[0]);
      } catch (error) {
        setError(error.toString());
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};
