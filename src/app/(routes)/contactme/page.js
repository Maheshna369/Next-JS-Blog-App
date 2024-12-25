"use client";
import React from "react";
import dynamic from "next/dynamic";

const ContactMe = dynamic(() => import("@/components/ContactMe/ContactMe"), {
  ssr: false,
});

const page = () => {
  return <ContactMe />;
};

export default page;
