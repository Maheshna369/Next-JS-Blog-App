"use client"
import React, { useState, useEffect } from "react";
import Home from "@/components/Home/Home";
import AuthHome from "@/components/Home/AuthHome";
import axios from "axios";
const page = () => {
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

export default page;
