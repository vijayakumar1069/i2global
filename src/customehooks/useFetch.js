"use client";

import { useState } from "react";
import axios from "axios";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const fetchData = async (url, method, body = null) => {
    setLoading(true);
    setError(null);

    try {
      // Configure request options
      const requestOptions = {
        method: method.toUpperCase(),
        ...options,
      };

      // Only include 'data' if there is a body
      if (body !== null) {
        requestOptions.data = body;
      }

      // Make API request using axios
      const response = await axios(url, requestOptions);
      setData(response?.data || null); // Update state with response data
      setLoading(false);
     

      return response?.data || null; // Return the response data directly
    } catch (err) {
      setError(err.response ? err.response.data : err.message); // Capture errors
      setLoading(false);

      // Clear the error after 3 seconds
      setTimeout(() => {
        setError(null); // Clear error state
      }, 3000);

      throw err; // Rethrow the error so it can be handled in the calling function
    }
  };

  return { loading, data, error, fetchData, setError };
};

export default useFetch;
