"use client"
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("@/components/Home/Home"), {
  ssr: false,
});
const AuthHome = dynamic(() => import("@/components/Home/AuthHome"), {
  ssr: false,
});
import axios from "axios";
const Page = () => {
  const [payload, setPayload] = useState(null);
  useEffect(() => {
    const fetchPayload = async () => {
      try {
        const response = await axios.post("/api/payload");

        setPayload(response.data.payload);
      } catch (error) {
        console.error("Error fetching payload", error);
      }
    };
    fetchPayload();
  }, []);
  return (
    <>
    {payload ? <AuthHome /> : <Home />}
    </>
  );
};

export default Page;
