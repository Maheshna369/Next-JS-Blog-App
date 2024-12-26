"use client";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { ModalContext } from "@/app/context/ModalContext";
import WelcomeModal from "../WelcomeModal";
import Link from "next/link";

const Home = () => {
  const { modal, setModal } = useContext(ModalContext);
  const [welcomeModal, setWelcomeModal] = useState(false);

  useEffect(() => {
    const isFirstLoad = sessionStorage.getItem("isFirstLoad");

    if (!isFirstLoad) {
      setWelcomeModal(true); // Trigger welcome modal on first load
      sessionStorage.setItem("isFirstLoad", "true"); // Set flag to avoid future triggers
    }
  }, []);
  return (
    <>
      <main className="absolute xl:top-24 top-20 xl:h-[1000px] h-[1500px] xl:w-full w-screen">
        <video
          className=" absolute left-0"
          src="/bgVideo.mp4"
          height={400}
          width={screen}
          autoPlay
          loop
          muted
        ></video>
        <div className="absolute z-10 backdrop-blur-sm xl:h-[860px] h-[500px] w-screen text-white flex xl:flex-col flex-col intro-container">
          <div className="flex flex-col xl:gap-6 gap-3 xl:w-[800px] h-[500px] w-full xl:my-40 xl:mx-20 px-5 py-10 intro-text-container">
            <h1 className="xl:text-7xl text-3xl">
              Write your <span className="text-teal-500">Blog</span> and Share
              your thought to Others !
            </h1>
            <p className="xl:text-4xl text-xl">
              Create, share, and connect with a global audience through your
              unique perspectives and stories!
            </p>
          </div>
          <video
            className="absolute top-[230px] left-0"
            src="/oceanVideo.mp4"
            height={screen}
            width={screen}
            autoPlay
            muted
            loop
          ></video>
          <div className="absolute top-[270px] w-screen h-[200px] flex flex-col gap-3  xl:mx-20 px-5 intro-join-container  justify-center items-center">
            <p className="xl:text-3xl text-4xl text-white">
              Join our community !
            </p>
            <Link className="h-10 xl:w-96 w-60 text-black" href={"/register"}>
              <input
                className="h-10 xl:w-96 w-60 text-white contrast-more: xl:px-7 px-5 py-3 bg-transparent border-2 border-white"
                type="text"
                placeholder="Register..."
              />
            </Link>
            <h1 className="text-white text-2xl absolute top-[300px] px-5">
              There&apos;s a Blank Space !
              <br></br>Scroll Down to Follow Me !
            </h1>
          </div>
        </div>
      </main>
      {welcomeModal && (
        <WelcomeModal
          welcomeModal={welcomeModal}
          setWelcomeModal={setWelcomeModal}
        />
      )}
    </>
  );
};

export default Home;
