"use client";
import React from "react";
import dynamic from "next/dynamic";

const Register = dynamic(() => import("@/components/Register/Register"), {
  ssr: false,
});

const page = () => {
  return <Register />;
};

export default page;
