"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
// import { useContext } from "react";
// import { AuthContext } from "@/app/context/AuthContext";
import axios from "axios";
import { ClipLoader } from "react-spinners";
// import toast, { Toaster } from "react-hot-toast";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { signOut } from "next-auth/react";

const Navbar = () => {
  // const { isAuth, checkAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef();
  const closeMenuBar = (e) => {
    if (ref.current === e.target) {
      setMenuOpen(false);
    }
  };
  useEffect(() => {
    const fetchPayload = async () => {
      try {
        const response = await axios.post("/api/payload");

        setPayload(response.data.payload);
      } catch (error) {
        console.error("Error fetching payload", error);
      }
    };
    fetchPayload();
  }, []);
  const handleLogout = async () => {
    try {
      setLoading(true);
      if (payload === "exists") {
        return signOut();
      }
      const response = await axios.post("/api/logout");
      if (response) {
        //  checkAuth(true);
        setLoading(false);
        toast.success(response.data.message);
        window.location.reload();
      }
    } catch (err) {
      console.error(`Error while Logout is ${err}`);
    }
  };
  const conditionalNavlinks = () => {
    if (payload) {
      return (
        <>
          <Link onClick={handleLogout} href={"/register"}>
            <li className="text-black text-lg flex flex-row justify-center items-center">
              Logout
              {loading && <ClipLoader />}
            </li>
          </Link>
          <Link href={"/myblogs"}>
            <li className="text-black text-lg">Your Blogs</li>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link href={"/register"}>
            <li className="text-black text-lg">Register</li>
          </Link>
          <Link href={"/login"}>
            <li className="text-black text-lg">Login</li>
          </Link>
          <Link
            onClick={() => toast.warning("Register to post an article !")}
            href={"/myblogs"}
          >
            <li className="text-black text-lg">Your Blogs</li>
          </Link>
        </>
      );
    }
  };
  return (
    <>
    <ToastContainer className="z-50" position="top-center"/>
      <nav className="bg-white xl:h-24 xl:w-full h-20 w-screen fixed z-20 top-0 flex flex-row justify-between items-center border-b-2 border-gray-200 rounded-none ">
        <Link href={"/"} className="mx-3 font-extrabold xl:text-xl text-lg">
          Maphy's Blog App
        </Link>

        <ul
          className={
            "mx-3 xl:flex-row xl:flex hidden list-none gap-3 justify-evenly items-center"
          }
        >
          <Link href={"/"}>
            <li className="text-black text-lg">Home</li>
          </Link>
          <ToastContainer
            style={{
              width: "100px", // You can use a fixed width like '300px' or '50%' depending on your design, // Optional: Set a max width if needed
              margin: "0 auto", // Center the toast
            }}
            position="top-center"
            autoClose="5000"
            transition={Slide}
          />
          {conditionalNavlinks()}

          <Link href={"/aboutme"}>
            <li className="text-black text-lg">About Me</li>
          </Link>
          <Link href={"/contactme"}>
            <li className="text-black text-lg">Contact Me</li>
          </Link>
        </ul>

        <button
          onClick={() => setMenuOpen(true)}
          className={
            menuOpen
              ? "hidden"
              : "flex justify-center items-center w-20 xl:hidden"
          }
        >
          <MenuIcon />
        </button>
        <div
          ref={ref}
          onClick={(e) => closeMenuBar(e)}
          className={
            menuOpen
              ? "h-screen w-screen flex flex-col fixed inset-0 justify-center items-center z-100"
              : "h-full w-full xl:hidden hidden justify-end items-center"
          }
        >
          <div className="flex justify-end items-center w-[50vw] absolute top-0 right-0 mr-3">
            <CloseIcon
              onClick={() => setMenuOpen(false)}
              color="black"
              className="place-self-end text-black"
            />
          </div>
          <div className="h-[90vh] w-[50vw]  absolute right-0 bg-gray-300 border-2 rounded-xl mr-3">
            <ul className="mx-3 h-full w-full flex flex-col list-none gap-3 justify-evenly items-center">
              <Link href={"/"} className="text-black hover:text-gray-700">
                <li className="text-black text-lg">Home</li>
              </Link>

              {conditionalNavlinks()}

              <Link
                href={"/aboutme"}
                className="text-black hover:text-gray-700"
              >
                <li className="text-black text-lg">About Me</li>
              </Link>
              <Link
                href={"/contactme"}
                className="text-black hover:text-gray-700"
              >
                <li className="text-black text-lg">Contact Me</li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
