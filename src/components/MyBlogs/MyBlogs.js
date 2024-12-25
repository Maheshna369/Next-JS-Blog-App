"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import PostModal from "../PostModal";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import { PropagateLoader } from "react-spinners";
import { useContext } from "react";
import { ModalContext } from "@/app/context/ModalContext";
import Modal from "../Modal";
import CloseIcon from "@mui/icons-material/Close";

const MyBlogs = () => {
  const { modal, setModal } = useContext(ModalContext);
  const { data: session } = useSession();
  const [postModal, setPostModal] = useState(false);
  const [payload, setPayload] = useState("");
  const [posts, setPosts] = useState([]);
  const [threeDotModal, setThreeDotModal] = useState({});
  const [deletePost, setDeletePost] = useState({});
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editPost, setEditPost] = useState({
    id: "",
    newTitle: "",
    newText: "",
  });
  // const [newTitle, setNewTitle] = useState("");
  // const [newText, setNewText] = useState("");
  const ref = useRef();
  const editRef = useRef();
  const handleThreeBarClose = (e) => {
    if (ref.current === e.target) {
      setThreeDotModal("");
    }
  };
  const onClickForEdit = (id, oldTitle, oldText) => {
    setOpenEditModal(true);
    setEditPost({ id: id, newTitle: oldTitle, newText: oldText });
  };
  const handleEditPost = async () => {
    setLoading(true);
    try {
      const blog = posts.find((post) => {
        return post._id === editPost.id;
      });
      if (!blog) {
        setLoading(false);
        console.log(blog);
        return toast.error("Blog is not present !");
      }
      const dbIndex = blog._id;
      const response = await axios.post("/api/edit", {
        dbIndex,
        newTitle: editPost.newTitle,
        newText: editPost.newText,
      });
      const data = response.data.message;
      toast.success(data);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error(`Error while Editing the Post is ${error}`);
      setLoading(false);
    }
  };
  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const post = posts.find((post) => {
        return post._id === id;
      });
      const dbIndex = post._id;
      const response = await axios.post("/api/deletePost", {
        dbIndex: dbIndex,
      });
      const data = response.data.message;
      toast.success(data);
      setLoading(false);
      window.location.reload();
    } catch (err) {
      console.error(`Error while deleting the post is ${err}`);
      setLoading(false);
    }
  };
  useEffect(() => {
    const getPayload = async () => {
      try {
        const response = await axios.post("/api/payload");
        if (response.data.payload === "exists") {
          setPayload(session.user.email);
        }
        setPayload(response.data.payload);
      } catch (err) {
        console.error(`Error while fetching the payload is: ${err}`);
      }
    };
    getPayload();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.post("/api/posts");
        const posts = response.data.posts;
        setPosts(posts);
      } catch (err) {
        console.error(`Error while fetching the posts from backend is ${err}`);
      }
    };
    fetchPosts();
  }, []);
  // const handleEditPost=(index)=>{
  //   setEditPost((prev)=>{})
  // }
  // const handleLike = async (id, payload) => {
  //   setLike((prevLike) => !prevLike);
  //   try {
  //     console.log(`The like is ${like}`);
  //     const updatedPosts = posts.map((post) => {
  //       if (post._id === id) {
  //         const newLikes = post.Likes + (like ? -1 : 1); // Toggle the likes
  //         return { ...post, Likes: newLikes };
  //       }
  //       return post;
  //     });

  //     setPosts(updatedPosts); // Update the state with the modified posts

  //     const blog = posts.find((post) => {
  //       return posts._id === id; // Check if the blog exists inside the Blogs array
  //     });
  //     if (!blog) {
  //       return console.log(`id not found, id is ${blog}`);
  //     }
  //     const dbIndex = posts.find((post) => post._id === id)._id;
  //     const response = await axios.post("api/like", {
  //       isLike: like,
  //       dbIndex: dbIndex,
  //       Username: payload,
  //     });
  //     const data = response.data.message;
  //     // toast.success()
  //   } catch (error) {
  //     console.error(`Error while updating like is ${error}`);
  //   }
  // };
  return (
    <>
      <ToastContainer style={{height: "50px", width: "200px"}} position="right"/>
      <main className="xl:h-[900px] xl:w-full h-[1500px] w-screen absolute xl:top-24 top-20 flex xl:flex-row flex-col xl:gap-10 gap-5 justify-center items-center bg-gray-500 xl:my-5">
        <section className="side-bar absolute xl:left-0 top-5 xl:h-[800px] h-32 xl:ml-5 xl:w-[20%] w-[80%] bg-white  border-2 rounded-2xl">
          <div className="flex flex-col justify-center items-center">
            <Image
              onClick={() =>
                toast.info(
                  `Sorry ${payload}, Photos and Videos can't be uploaded as i don't have funds to buy premium MONGODB Atlas package.`
                )
              }
              src="/defaultImage.jpg"
              height={100}
              width={100}
              alt="Image of a default User"
            />
            <p className="text-lg">{payload}</p>
          </div>
        </section>
        <section className="main absolute xl:right-0 top-40 xl:h-[800px] xl:w-[75%] h-[1350px] w-[80%] flex flex-col xl:gap-5 gap-3">
          <div className="xl:h-[200px] h-[150px] w-[100%] bg-white border-2 rounded-2xl flex flex-col justify-evenly items-center">
            <h1 className="xl:text-xl text-2xl font-extrabold">Post Your Blog</h1>
            <input
              className="border-2 rounded-2xl w-[85%] h-10 bg-[#F0F2F5] text-[#65686C] px-5"
              type="text"
              placeholder="Share your thought as blog to others !"
              onClick={() => setPostModal(true)}
            />
          </div>
          <div className="w-full xl:h-[600px] h-[1000px] bg-slate-400 text-black border-2 rounded-2xl flex flex-col justify-evenly items-center gap-5 overflow-auto">
            <h1 className="font-extrabold xl:text-5xl text-4xl">All Posts</h1>
            {posts.length > 0 ? (
              posts.map((post, index) => {
                const { Year, Month, Day } = post.Date; // Assuming blog.Date has Year, Month, Day
                const formattedDate = `${Day}/${Month}/${Year}`; // Format as Day/Month/Year
                return (
                  <div
                    key={index}
                    className="flex flex-col  justify-evenly items-center w-[90%] border-2 bg-white rounded-xl shadow-2xl mb-3"
                  >
                    <div className="flex flex-row justify-between items-center w-full mx-5 border-b-2 border-b-gray-400">
                      <span className="mx-5 text-sm">Posted on {formattedDate}</span>

                      <div className="flex flex-row justify-center items-center">
                        {/* <span
                          onClick={() => handleLike(post._id, payload)}
                          className="flex flex-col justify-center items-center w-20"
                        >
                          {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                          {post.Likes}
                        </span> */}
                        <div className="flex flex-row justify-center items-center ">
                          <span className="text-sm">{post.Likes} Likes</span>
                          <MoreVertIcon
                            onClick={() =>
                              setThreeDotModal((prev) => {
                                return { ...prev, [post._id]: !prev[post._id] };
                              })
                            }
                          />
                          {threeDotModal[post._id] && (
                            <div
                              ref={ref}
                              onClick={(e) => handleThreeBarClose(e)}
                              className={`${
                                threeDotModal[post._id]
                                  ? "opacity-100 scale-100"
                                  : "opacity-0 scale-90"
                              } h-screen w-screen flex justify-center fixed items-center inset-0 z-[100] transition-all duration-900 ease-in-out ${
                                threeDotModal[post._id]
                                  ? "pointer-events-auto"
                                  : "pointer-events-none"
                              }`}
                            >
                              <div className="flex flex-col justify-evenly items-center  h-72 w-72 bg-white shadow-lg rounded-3xl">
                                <h3 className="text-3xl font-bold">Options:</h3>
                                <button
                                  onClick={() =>
                                    onClickForEdit(
                                      post._id,
                                      post.Title,
                                      post.Text
                                    )
                                  }
                                  className="text-xl font-medium flex justify-center items-center border-2 border-white bg-[#0d6efd] text-white rounded-xl px-10 py-5"
                                >
                                  Edit Blog
                                  <EditIcon className="ml-5" />
                                </button>
                                <button
                                  onClick={() => handleDeletePost(post._id)}
                                  className="text-xl font-medium flex justify-center items-center border-2 border-white bg-[#0d6efd] text-white rounded-xl px-7 py-5"
                                >
                                  Delete Blog
                                  <DeleteIcon className="ml-5" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col">
                      <div className="flex w-full justify-center items-center">
                        <h1 className="xl:text-3xl text-2xl font-extrabold py-3 xl:px-10 px-5 border-b-2">
                          {post.Title}
                        </h1>
                      </div>
                      <p className={"font-medium xl:text-xl text-lg mx-5 my-3"}>
                        {post.Text}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No Posts available</p>
            )}
          </div>
        </section>
      </main>
      {postModal && (
        <PostModal
          postModal={postModal}
          setPostModal={setPostModal}
          payload={payload}
        />
      )}
      {loading && (
        <div className="fixed inset-0 w-screen h-screen backdrop-blur-sm flex flex-col justify-center items-center z-[1000]">
          <PropagateLoader />
        </div>
      )}
      {openEditModal && (
        <div
          ref={editRef}
          onClick={(e) => {
            if (e.target === editRef.current) {
              setOpenEditModal(false);
            }
          }}
          className="w-screen h-screen fixed inset-0 backdrop-blur-sm flex flex-col justify-center items-center z-[200]"
        >
          <div className="xl:w-[500px] w-[90%] flex justify-end items-center">
            <button
              className="place-self-end"
              onClick={() => setOpenEditModal(false)}
            >
              <CloseIcon className="xl:w-20 xl:h-20 h-5 w-5" />
            </button>
          </div>
          <div className="xl:h-[500px] xl:w-[500px] h-[80vh] w-[90%] bg-white border-2 rounded-xl flex flex-col justify-evenly items-center">
            <div className="flex flex-col justify-center items-center gap-3 xl:w-96 w-[90%]">
              <p className="text-2xl font-bold">New Title</p>
              <input
                className="border-2 rounded-xl w-full xl:px-7 px-5 text-xl h-10"
                type="text"
                placeholder="Enter Your New Title"
                onChange={(e) =>
                  setEditPost((prev) => {
                    return { ...prev, newTitle: e.target.value };
                  })
                }
                value={editPost.newTitle}
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-3 xl:w-96 w-[90%]">
              <p className="text-2xl font-bold ">New Text</p>
              <textarea
                className="border-2 rounded-2xl w-full h-72 xl:px-7 px-5 xl:text-3xl text-2xl overflow-auto resize-none"
                name=""
                id=""
                placeholder="Enter Your New Text..."
                onChange={(e) =>
                  setEditPost((prev) => {
                    return { ...prev, newText: e.target.value };
                  })
                }
                value={editPost.newText}
              ></textarea>
            </div>
            <button
              onClick={handleEditPost}
              className="xl:px-7 xl:py-5 px-5 py-3 flex justify-center items-center bg-[#0d6efd] text-white border-b border-white rounded-2xl"
            >
              Proceed to Edit
              <EditIcon className="ml-5" />
            </button>
          </div>
        </div>
      )}
      {modal && <Modal />}
    </>
  );
};

export default MyBlogs;
