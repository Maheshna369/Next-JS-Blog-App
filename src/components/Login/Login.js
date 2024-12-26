"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
// import Google from "@/components/icons/google.svg";
// import { useState, useContext } from "react";
// import { AuthContext } from "@/app/context/AuthContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import GoogleButton from "react-google-button";
import { useContext } from "react";
import { ModalContext } from "@/app/context/ModalContext";
const Login = () => {
  const { modal, setModal } = useContext(ModalContext);
  const { data: session } = useSession();
  // const { isAuth, checkAuth } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputCredentials, setInputCredentials] = useState({
    Username: "",
    Password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleClick = async () => {
    if (
      inputCredentials.Username.trim() === "" ||
      inputCredentials.Password.trim() === ""
    ) {
      return toast.error("Fill all the fields !");
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/login", inputCredentials);
      if (response) {
        console.log(response.data);
        setLoading(false);
        toast.success(response.data.message);
        // checkAuth(true);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleReset = () => {
    setInputCredentials({ Username: "", Password: "" });
  };
  const oAuth = () => {
    if (!session) {
      return (
        <GoogleButton
          className="border-2 rounded-xl !important"
          onClick={() => signIn()}
        />
      );
    }
  };
  return (
    <>
      <div className="absolute xl:top-24 top-20 bg-yellow-300 xl:h-[600px] h-[500px] xl:w-screen w-screen flex justify-center items-center">
        <Toaster position="top-center" />
        <div className="flex flex-col justify-evenly bg-white xl:h-[450px] h-[400px] xl:w-[450px] w-[90%] items-center shadow-2xl border-2 border-white rounded-3xl">
          <h3 className="xl:text-4xl text-3xl">Login</h3>

          <div className="w-96 flex flex-col gap-2 my-2 justify-center items-center">
            <div className="w-[90%]">
              <p className="text-xl mx-3">Username</p>
            </div>
            <input
              name="Username"
              className="text-lg h-10 xl:w-96 w-[90%] border-2 border-gray-400 rounded-xl text-black p-2"
              type="text"
              placeholder="Enter Username..."
              onChange={handleChange}
              value={inputCredentials.Username}
            />
          </div>
          <div className="w-96 flex flex-col gap-2 my-2 justify-center items-center">
            <div className="w-[90%]">
              <p className="text-xl mx-3">Password</p>
            </div>
            <div className="flex flex-row  w-[100%] justify-center items-center">
              <input
                name="Password"
                className="text-lg h-10 xl:w-96 w-[90%] border-2 border-gray-400 rounded-xl text-black p-2"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password..."
                onChange={handleChange}
                value={inputCredentials.Password}
              />
              {showPassword ? (
                <VisibilityOffIcon
                  className="z-10 absolute xl:left-[930px] left-[350px]"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <VisibilityIcon
                  className="z-10 absolute xl:left-[930px] left-[350px]"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <button
              onClick={handleClick}
              className="text-white bg-[#0d6efd] py-3 px-5 border-2 rounded-xl"
            >
              Login
            </button>
            <button
              onClick={handleReset}
              className="text-white bg-[#0d6efd] py-3 px-5 border-2 rounded-xl"
            >
              Reset
            </button>
          </div>
          <div className="w-96 flex flex-row justify-end items-center mr-3">
            <p>
              Don&apos;t Have an Account,{" "}
              <Link className="text-[#0d6efd]" href={"/register"}>
                Register
              </Link>
            </p>
          </div>
          <p>or,</p>
          {oAuth()}
        </div>
      </div>
      <div className="h-[500px] flex justify-center items-center">
        <h1 className="text-black text-2xl absolute top-[700px] px-5">
          There&apos;s a Blank Space !<br></br>Scroll Down to Follow Me !
        </h1>
      </div>
      {loading && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex h-screen w-screen justify-center items-center">
          <PulseLoader />
        </div>
      )}
    </>
  );
};

export default Login;
