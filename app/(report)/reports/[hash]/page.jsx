"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import FileInfo from "@components/reports/FileInfo";
import Loading from "./loading";

const Hash = ({ params }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'x-api-key': process.env.NEXT_PUBLIC_API_SECRET
        };

        let response;
        do {
          response = await axios.get(`http://localhost:8080/api/${params.hash}`, { headers });

          if (response.data.data?.attributes && response.data.data.attributes.status === "completed") {
            setLoading(false);
            setData(response.data);
            return;
          }

          if (!response.data.data?.attributes) {
            setData(response.data);
            setLoading(false);
            return;
          }

          if (response.data.data.attributes.status === undefined || response.data.data.attributes.status === null) {
            setLoading(false);
            return;
          }

          await new Promise(resolve => setTimeout(resolve, 3000));
        } while (response.data.data?.attributes && response.data.data.attributes.status !== "completed");
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [params.hash]);

  if (loading) return <Loading message="Analysing" />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full flex-center flex-col">
      {data && <FileInfo data={data} />}
    </div>
  );
};

export default Hash;
