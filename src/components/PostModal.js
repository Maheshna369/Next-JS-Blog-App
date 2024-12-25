"use client"
import React, { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PostModal = (props) => {
  const { postModal, setPostModal, payload } = props;
  const [loading, setLoading] = useState(false);
  const [Title, setTitle] = useState("");
  const [Text, setText] = useState("");
  const [file, setFile] = useState("");
  const [blog, setBlog] = useState({ Title: "", Text: "" });

  
  // const handleText
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  const handleFileChange = (e) => {
    setFile(e.target.value);
  };
  const handleClick = async () => {
    if (Title.trim() === "" || Text.trim() === "") {
      return toast.warning("Fill all the fields !!");
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/blog", { Title, Text });
      const data = response.data;
      toast.success(data.message);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error(`Error while posting blog is ${error}`);
    }
  };
  const ref = useRef();
  const handleClose = (e) => {
    if (ref.current === e.target) {
      setPostModal(false);
    }
  };
  const handleFileClick = (e) => {
    e.preventDefault();
    return toast.info(
      `Sorry ${payload}, Photos and Videos can't be uploaded as i don't have funds to buy premium MONGODB Atlas package.`
    );
  };
  return (
    <>
      {loading && (
        <div className="fixed inset-0 w-screen h-screen backdrop-blur-sm flex flex-col justify-center items-center z-[100]">
          <PropagateLoader />
        </div>
      )}
      <div
        ref={ref}
        onClick={(e) => handleClose(e)}
        className="fixed inset-0 w-screen h-screen backdrop-blur-sm flex flex-col justify-center items-center z-50"
      >
        <ToastContainer />
        <div className="xl:w-[50vw] w-[80%] flex flex-row justify-end items-center">
          <CloseIcon
            className="place-self-end"
            onClick={() => setPostModal(false)}
          />
        </div>
        <div className="flex flex-col bg-white xl:h-[75vh] xl:w-[50vw] w-[80%] border-2 rounded-3xl">
          <div className="xl:w-[50vw] w-full xl:h-[10vh]  border-b-2 border-b-gray-400 py-5 flex justify-center items-center">
            <h1 className="text-2xl font-bold ">Create Blog</h1>
          </div>
          <div className="xl:w-[50vw] h-[65vh] w-full flex flex-col justify-evenly items-center">
            <div className="xl:w-[80%] w-[90%] flex flex-col justify-center items-center gap-3">
              <h3 className="xl:text-3xl text-2xl">Title</h3>
              <input
                onChange={(e) => handleTitleChange(e)}
                value={Title}
                type="text"
                className="xl:h-10 h-8 w-[100%] bg-[#f0f2f5] text-[black] px-5 py-3 xl:text-2xl text-xl rounded-xl"
                placeholder="Enter Title of Your Blog..."
              />
            </div>
            <div className="xl:w-[80%] w-[90%] flex flex-col justify-center items-center gap-3">
              <h3 className="xl:text-3xl text-2xl">Text</h3>
              <textarea
                onChange={(e) => handleTextChange(e)}
                value={Text}
                type="text"
                className="xl:h-40 h-36 w-[100%] bg-[#f0f2f5] text-[black] resize-none xl:py-5 xl:px-5 px-3 py-3 xl:text-2xl text-xl rounded-xl"
                placeholder="Describe your Blog..."
              />
            </div>
            <div className="flex flex-row justify-center items-center ">
              {/* <p className="text-sm">Add Photos or Videos to your blog 👉</p> */}
              <input
              className="inline"
                onChange={(e) => handleFileChange(e)}
                type="file"
                accept="image/*,video/*"
                onClick={(e)=>handleFileClick(e)}
              />
            </div>
            <button
              onClick={handleClick}
              className="bg-[#0d6efd] text-white py-5 px-10 border-2 rounded-xl"
            >
              Post Blog
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostModal;
