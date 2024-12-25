"use client";
import React from "react";
import dynamic from "next/dynamic";

const AboutMe = dynamic(() => import("@/components/AboutMe/AboutMe"), {
  ssr: false,
});

const page = () => {
  return <AboutMe />;
};

export default page;
