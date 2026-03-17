import { useState } from "react";
import { toast } from "react-toastify";

const useFetch = (cb) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fn = async (...args) => {

        try {

        setLoading(true);
        setError(null);

        const response = await cb(...args);
        setData(response);
        return response;

        } catch (err) {
        setError(err);
        toast.error(err.response?.data?.message || err.message);

        } 
        finally {
        setLoading(false);
        }

    };

  return { data, loading, error, fn, setData };

};

export default useFetch;