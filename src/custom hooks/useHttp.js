import { useState, useCallback, useEffect } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request"
    );
  }
  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      console.log("Sending request to:", url);
      console.log(
        "Request config:",
        JSON.stringify({ ...config, body: JSON.stringify(data) })
      );

      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, {
          ...config,
          headers: { "Content-Type": "application/json", ...config.headers },
          body: JSON.stringify(data)
        });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (!config.method || config.method === "GET") {
      sendRequest();
    }
  }, [sendRequest, config]);

  return { data, isLoading, error, sendRequest, clearData };
}
