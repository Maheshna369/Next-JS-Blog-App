"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
const AboutMe = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState("");
  useEffect(() => {
    const fetchPayload = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/payload");
        const data = response.data.payload;
        setPayload(data);
        setLoading(false);
      } catch (error) {
        console.log(`Error while fetching the payload is ${error}`);
        setLoading(false);
      }
    };
    fetchPayload();
  }, []);
  return (
    <>
      {loading && (
        <div className="h-[1000px] w-screen top-24 absolute flex justify-center items-center z-[1000]">
          <ClipLoader size={"50"} />
        </div>
      )}
      <div className="xl:h-[1000px] xl:w-full h-[500px] w-screen absolute top-20 xl:top-24 flex flex-col justify-evenly items-center xl:my-20 my-5">
        <div className="w-[90%] flex justify-between items-center xl:my-10">
          <div className="w-[70%] flex justify-center items-center">
            <h1 className="xl:text-7xl text-3xl w-full font-extrabold">{payload? `Hi ${payload}`: "Hi"}, I am Mahesh Nayak</h1>
          </div>
          <div className="w-[30%] flex justify-center items-center">
            <Image
              className="rounded-3xl border-2 border-white shadow-xl"
              src="/aboutmephoto.jpg"
              alt="A boy watching advanced city"
              height={400}
              width={400}
            />
          </div>
        </div>
        <div className="w-[90%] h-[400px] flex justify-center items-center xl:mx-10 xl:mb-5 mx-5 mb-3">
          <p className="mx-5 my-3 font-medium xl:text-xl text-lg">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a
            dedicated <span className="font-extrabold">MERN + Next.js Developer</span> with a focus on creating
            efficient and scalable web applications. I specialize in
            transforming ideas into functional, user-centric solutions using
            modern tools and technologies.<br></br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My work
            is driven by a systematic approach to problem-solving, where
            understanding the why and how is integral to achieving meaningful
            outcomes. I strive to ensure that every solution I deliver is
            grounded in logic, practicality, and technical precision.
          </p>
        </div>
        <div className="w-[90%]  flex xl:flex-row flex-col justify-center items-center">
          <div className="w-full flex flex-col justify-center items-center border-b-2 pb-3">
            <div className="w-full">
              <h3 className="font-bold xl:text-3xl text-2xl my-3 xl:mx-5 mx-3">My Approach</h3>
            </div>
            <p className="font-medium text-xl xl:my-3 xl:mx-5 mx-3">
              I approach every task with a mindset of learning and adaptability.
              For me, it’s essential to stay aligned with the latest
              advancements in technology and acquire skills that meet market
              demands. This not only enhances my ability to deliver results but
              also ensures I remain versatile in a dynamic industry.
            </p>
          </div>
          <div className="w-full flex xl:flex-row flex-col justify-center items-center border-b-2 pb-3">
            <div className="w-full">
              <h3 className="font-bold xl:text-3xl text-2xl my-3 xl:mx-5 mx-3">Vision and Goals</h3>
            </div>

            <p className="font-medium text-xl xl:my-3 xl:mx-5 mx-3">
              My ultimate aim is to become a problem solver and contribute
              solutions that address real-world challenges. With a long-term
              vision of transitioning into entrepreneurship, I focus on building
              a foundation that blends technical expertise with a keen
              understanding of business needs.
            </p>
          </div>
          <div className="w-full  flex xl:flex-row flex-col justify-center items-center">
            <div className="w-full">
              <h3 className="font-bold xl:text-3xl text-2xl my-3 xl:mx-5 mx-3">Why This Blog?</h3>
            </div>
            <p className="font-medium text-xl xl:my-3 xl:mx-5 mx-3">
              This blog was created as part of my journey to showcase my
              projects, such as this website, and to attract freelancing
              opportunities. My goal is to save money for my higher studies
              abroad while demonstrating my skills to potential clients and
              collaborators.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
