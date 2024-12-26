"use client";
import React, { useState } from "react";
import { useContext } from "react";
import { ModalContext } from "@/app/context/ModalContext";
import { useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
const WelcomeModal = (props) => {
  const { modal, setModal } = useContext(ModalContext);
  const WelcomeModal = props.WelcomeModal;
  const setWelcomeModal = props.setWelcomeModal;
  const ref = useRef();
  const handleClose = (e) => {
    if (ref.current === e.target) {
      setWelcomeModal(false);
    }
  };
  return (
    <div
      ref={ref}
      onClick={(e) => handleClose(e)}
      className="h-screen w-screen fixed inset-0 flex flex-col justify-center items-center backdrop-blur-sm z-10"
    >
      <div className=" w-80 flex justify-end items-center">
        <CloseIcon onClick={()=>setWelcomeModal(false)} className="place-self-end" />
      </div>
      <div className="h-80 w-80 shadow-2xl flex flex-col justify-evenly items-center bg-white text-black border-2 border-white rounded-xl">
        <h3 className="xl:text-2xl text-3xl text-yellow-300 m-3 text-bold">Welcome to My Blog App</h3>
        <p className="m-3 text-2xl">
          Do Register yourself and Post your articles to be a part of
          maphy&apos;s blog community
        </p>
      </div>
    </div>
  );
};

export default WelcomeModal;
