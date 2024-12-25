"use client";
import React, { useState } from "react";
import Link from "next/link";
import Facebook from "./icons/facebook.svg";
import Instagram from "./icons/instagram.svg";
import X from "./icons/x.svg";
import LinkedIn from "./icons/linkedin.svg";
import Github from "./icons/github.svg";
import { useContext } from "react";
import { ModalContext } from "@/app/context/ModalContext";
const Footer = () => {
  const facebookLink = "https://www.facebook.com/maheshna369";
  const instagramLink = "https://www.instagram.com/maheshna_369/";
  const xLink = "https://x.com/maheshna_369?t=LwQTV3cCq24uT_fReEpIRw&s=09";
  const linkedinLink = "https://www.linkedin.com/in/mahesh-nayak-53b653249";
  const githubLink = "https://github.com/Maheshna369";
  const { modal, setModal } = useContext(ModalContext);
  console.log(`The value of modal is ${modal}`);
  return (
    <footer className="bg-black text-white absolute top-[1500px] xl:top-[1100px] bottom-0 xl:h-60 h-52 w-screen xl:w-full flex flex-col justify-between items-stretch gap-5 border-t-2 border-black">
      <div className="first w-full xl:mx-5 mx-3 mt-5 xl:mt-10 flex flex-row justify-between items-stretch">
        <div className="links w-full flex h-full flex-col justify-center items-center gap-5">
          <div className=" rounded-xl border-blue-600 text-yellow-400 xl:text-5xl text-2xl">
            Follow Me
          </div>
          <ul className="flex flex-row xl:gap-5 gap-3 mx-3 justify-evenly items-center">
            <Link href={""} passHref>
              <li
                className="bg-white border-2 border-gray-200 rounded-[50%] p-3"
                onClick={() => window.open(facebookLink, "_blank")}
              >
                <Facebook src={facebookLink} height={25} width={25} />
              </li>
            </Link>
            <Link href={""} passHref>
              <li
                className="bg-white border-2 border-gray-200 rounded-[50%] p-3"
                onClick={() => window.open(instagramLink, "_blank")}
              >
                <Instagram className="rounded-[50%]" height={25} width={25} />
              </li>
            </Link>
            <Link href={""} passHref>
              <li
                className="bg-white border-2 border-gray-200 rounded-[50%] p-3"
                onClick={() => window.open(xLink, "_blank")}
              >
                <X className="rounded-[50%]" height={25} width={25} />
              </li>
            </Link>
            <Link href={""} passHref>
              <li
                className="bg-white border-2 border-gray-200 rounded-[50%] p-3"
                onClick={() => window.open(linkedinLink, "_blank")}
              >
                <LinkedIn className="rounded-[50%]" height={25} width={25} />
              </li>
            </Link>
            <Link href={""} passHref>
              <li
                className="bg-white border-2 border-gray-200 rounded-[50%] p-3"
                onClick={() => window.open(githubLink, "_blank")}
              >
                <Github height={25} width={25} />
              </li>
            </Link>
          </ul>
        </div>
        {/* <div className="donate xl:h-32 h-40 w-40 xl:w-96 flex justify-center items-center">
          <button
            className="bg-purple-500 text-yellow-300 xl:p-4  border-2 border-white rounded-xl h-10 w-10"
            onClick={() => setModal(true)}
          >
            Support Me !
          </button>
        </div> */}
      </div>
      <div className="last xl:mx-5 xl:mb-6 px-2 flex flex-row justify-between items-center w-full">
        <p className="text-sm">A Full Stack Blog App</p>
        <p className="text-sm">&copy; 2024 Maphy.All Right Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
