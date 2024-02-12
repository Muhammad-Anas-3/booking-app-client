import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.log(error)
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
