"use client";
import React from "react";
import dynamic from "next/dynamic";

const MyBlogs = dynamic(() => import("@/components/MyBlogs/MyBlogs"), {
  ssr: false,
});

const page = () => {
  return (
    <>
      <MyBlogs />
    </>
  );
};

export default page;
