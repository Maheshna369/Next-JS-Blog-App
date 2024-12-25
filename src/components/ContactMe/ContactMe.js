"use client";
import axios from "axios";
import React, { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { PropagateLoader } from "react-spinners";
import { Slide, toast, ToastContainer } from "react-toastify";

const ContactMe = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef();
  const [userDetails, setUserDetails] = useState({
    Name: "",
    Age: "",
    Gender: "",
  });
  const [developerDetails, setDeveloperDetails] = useState({
    PhoneNumber: "",
    Email: "",
    Address: "",
  });
  const handleClick = async () => {
    try {
      if (
        userDetails.Name.trim() === "" ||
        userDetails.Age.trim() === "" ||
        userDetails.Gender.trim() === ""
      ) {
        return toast.warning("Fill all the Fields !");
      }
      const res = await axios.post("/api/payload");
      const payload = res.data.payload;
      if (!payload) {
        toast.info("First Register to get details of mine !");
        return;
      }
      setLoading(true);
      const response = await axios.post("/api/contactme", userDetails);
      const data = response.data.developerDetails;
      setDeveloperDetails({
        PhoneNumber: data.PhoneNumber,
        Email: data.Email,
        Address: data.Address,
      });
      setLoading(false);
      setModalOpen(true);
      // setTimeout(()=>{
      //   setModalOpen(false);
      // }, 10000)
    } catch (error) {
      console.error(`Error while fetching data of developer is ${error}`);
      setLoading(false);
    }
  };
  const handleModalClose = (e) => {
    if (ref.current === e.target) {
      setModalOpen(false);
    }
  };
  return (
    <>
      {loading && (
        <div className="w-full h-full fixed inset-0 backdrop-blur-sm z-100 flex justify-center items-center">
          <PropagateLoader size={"large"} />
        </div>
      )}
      <ToastContainer position="top-center" transition={Slide} />
      <div className="flex flex-col justify-evenly items-center absolute xl:top-24 top-20 xl:h-[1000px] h-[700px] xl:w-full w-screen gradient-background">
        <h1 className="font-extrabold xl:text-7xl text-5xl">Fill the Form</h1>
        <div className="xl:w-[60%] xl:h-[60%] w-[90%] h-[500px] bg-gray-400 border-2 border-white rounded-3xl flex flex-col justify-evenly items-center">
          <div className="w-[75%] bg-white border-2 rounded-3xl p-4 flex justify-center flex-col items-center">
            <p className="text-xl font-medium mx-7 mt-3 mb-1">Name</p>
            <input
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) =>
                setUserDetails((prevDetails) => {
                  return { ...prevDetails, Name: e.target.value };
                })
              }
              value={userDetails.Name}
              className="w-[90%] h-12 border-b-2 border-b-black px-5 text-xl mt-2 focus:border-b-black focus:outline-none"
            />
          </div>
          <div className="w-[75%] bg-white border-2 rounded-3xl p-4 flex justify-center flex-col items-center">
            <p className="text-xl font-medium mx-7 mt-3 mb-1">Age</p>
            <input
              type="number"
              placeholder="Enter Your Age"
              onChange={(e) => {
                if (e.target.value > 0) {
                  setUserDetails((prevDetails) => {
                    return { ...prevDetails, Age: e.target.value };
                  });
                }
              }}
              value={userDetails.Age}
              className="w-[90%] h-12 border-b-2 border-b-black px-5 text-xl mt-2 focus:border-b-black focus:outline-none"
            />
          </div>
          <div className="w-[75%] bg-white border-2 rounded-3xl p-4 flex justify-center flex-col items-center">
            <p className="w-[90%] flex justify-center items-center text-xl font-medium mt-3 mb-1">
              Gender
            </p>
            <div className="w-[90%] flex justify-evenly items-center mt-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="Male"
                  name="gender"
                  checked={userDetails.Gender === "Male"}
                  value="Male"
                  onChange={(e) =>
                    setUserDetails((prevDetails) => {
                      return { ...prevDetails, Gender: e.target.value };
                    })
                  }
                  className="w-5 h-5"
                />
                <label htmlFor="Male" className="mx-2 font-medium text-xl">
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="Female"
                  name="gender"
                  checked={userDetails.Gender === "Female"}
                  value="Female"
                  onChange={(e) =>
                    setUserDetails((prevDetails) => {
                      return { ...prevDetails, Gender: e.target.value };
                    })
                  }
                  className="w-5 h-5"
                />
                <label htmlFor="Female" className="mx-2 font-medium text-xl">
                  Female
                </label>
              </div>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="px-10 py-3 bg-[#0d6efd] text-white rounded-xl border-2 mt-5"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="w-screen h-[800px] absolute top-[780px] gradient-background"></div>
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .gradient-background {
          background: linear-gradient(
            -45deg,
            #ee7752,
            #e73c7e,
            #23a6d5,
            #23d5ab
          );
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
      `}</style>
      {modalOpen && (
        <div
          ref={ref}
          onClick={handleModalClose}
          className="h-full w-full fixed inset-0 flex flex-col justify-center items-center z-[200] backdrop-blur-sm"
        >
          <div className="xl:w-[500px] xl:h-[400px] w-[90%] h-[75vh] flex flex-col justify-center items-center">
            <div className="xl:w-full w-full flex justify-end items-center ">
              <CloseIcon
                onClick={() => setModalOpen(false)}
                className="place-self-end cursor-pointer"
                color="black"
              />
            </div>
            <div className="xl:w-full xl:h-full h-[65vh] w-full bg-white flex flex-col justify-evenly items-center border-2 rounded-3xl">
              <h1 className="xl:text-3xl text-2xl font-extrabold text-[#0d6efd]">
                My Contact Details
              </h1>
              <div className="w-full">
                <p className="text-xl font-bold mx-10 my-5 text-[#28a745]">
                  Phone Number:{" "}
                  <span className="font-medium text-xl text-black">
                    {developerDetails.PhoneNumber}
                  </span>
                </p>
              </div>
              <div className="w-full">
                <p className="text-xl font-bold mx-10 my-5 text-[#007bff]">
                  Email:{" "}
                  <span className="font-medium text-xl text-black">
                    {developerDetails.Email}
                  </span>
                </p>
              </div>
              <div className="w-full">
                <p className="text-xl font-bold mx-10 my-5 text-[#6c757d]">
                  Address:{" "}
                  <span className="font-medium text-xl text-black">
                    {developerDetails.Address}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactMe;
