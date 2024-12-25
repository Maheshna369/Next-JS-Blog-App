"use client"
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import data from "./data.json";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { ModalContext } from "@/app/context/ModalContext";
import { useContext } from "react";
import Modal from "../Modal";

const AuthHome = () => {
  const { modal, setModal } = useContext(ModalContext);
  const [like, setLike] = useState({});
  const [titleExpand, setTitleExpand] = useState(false);
  const [textExpand, setTextExpand] = useState(false);
  const [blogs, setBlogs] = useState(data);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/home");
        const data = response.data.message;

        setPosts(data || []);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.log(`Error while fetching all the posts are : ${err}`);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  const handleLike = async (id, Username) => {
    setLike((prevLikes) => {
      return { ...prevLikes, [id]: !prevLikes[id] }; // Fix: Corrected the key usage from `id` to `[id]`
    });

    try {
      console.log(`The like is ${like}`);

      const updateLike = posts.map((post) => {
        // Check if post.Blogs is an object or an array
        if (Array.isArray(post.Blogs)) {
          return {
            ...post,
            Blogs: post.Blogs.map((blogpost) => {
              if (blogpost._id === id) {
                return {
                  ...blogpost,
                  Likes: like[id] ? blogpost.Likes - 1 : blogpost.Likes + 1, // Increment or decrement based on 'like'
                };
              }
              return blogpost;
            }),
          };
        } else if (post.Blogs._id === id) {
          // Handle the case when Blogs is an object and not an array
          return {
            ...post,
            Blogs: {
              ...post.Blogs,
              Likes: like[id] ? post.Blogs.Likes - 1 : post.Blogs.Likes + 1,
            },
          };
        }
        return post;
      });

      setPosts(updateLike);

      const blog = posts.find((post) => {
        if (Array.isArray(post.Blogs)) {
          return post.Blogs.some((blogPost) => blogPost._id === id);
        } else {
          return post.Blogs._id === id; // For when Blogs is not an array
        }
      });

      if (!blog) {
        return console.log(`id not found, id is ${id}`);
      }

      const dbIndex =
        blog.Blogs._id ||
        blog.Blogs.find((blogpost) => blogpost._id === id)._id;

      const response = await axios.post("api/like", {
        isLike: like[id],
        dbIndex,
        Username,
      });

      const data = response.data.message;
      // toast.success()
    } catch (error) {
      console.error(`Error while updating like is ${error}`);
    }
  };

  return (
    <>
      {loading && (
        <div className="h-screen w-screen fixed inset-0 flex justify-center items-center z-[100] backdrop-blur-sm">
          <ClipLoader size={50} />
        </div>
      )}
      <div className="xl:h-[1000px] xl:w-full h-[1500px] w-screen absolute xl:top-24 top-20 bg-gray-500 flex justify-center items-center gradient-background">
        <div className="w-[85%] xl:h-[800px] h-[1200px] absolute top-20 bg-gray-200 shadow-lg overflow-auto flex flex-col justify-start items-center border-2 rounded-2xl ">
          <h1 className="text-3xl font-extrabold border-b-2 border-b-gray-400 xl:my-7 my-5 py-3 text-blue-500">
            Recent Blogs
          </h1>
          {posts.map((post) => {
            const { Year, Month, Day } = post.Blogs.Date; // Assuming blog.Date has Year, Month, Day
            const formattedDate = `${Day}/${Month}/${Year}`; // Format as Day/Month/Year
            return (
              <div
                key={post.Blogs._id}
                className="w-[85%] border-2 border-black rounded-xl pb-4 my-5 bg-white"
              >
                <div className="flex flex-row justify-between items-center py-3 border-b-2 border-b-gray-400">
                  <span className="mx-5 my-5 text-sm">
                    Posted by {post.Username} on {formattedDate}{" "}
                  </span>

                  <span className="xl:mx-5 ml-5 mr-3  my-5 justify-center items-center flex">
                    {like[post.Blogs._id] ? (
                      <FavoriteIcon
                        className="xl:h-20 xl:w-20"
                        onClick={() =>
                          handleLike(post.Blogs._id, post.Username)
                        }
                      />
                    ) : (
                      <FavoriteBorderIcon
                        className="xl:h-20 xl:w-20"
                        size="large"
                        onClick={() =>
                          handleLike(post.Blogs._id, post.Username)
                        }
                      />
                    )}
                    {post.Blogs.Likes}
                  </span>
                </div>
                <div className="flex flex-col w-full">
                  <div className="w-full flex justify-center items-center">
                    <span className="xl:text-3xl text-2xl font-extrabold xl:px-10 px-5 py-3 border-b-2">
                      {post.Blogs.Title}
                    </span>
                  </div>
                  <p className="xl:my-10 xl:mx-5 mx-3 my-5 font-medium text-lg">
                    {post.Blogs.Text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {modal && <Modal />}
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
    </>
  );
};

export default AuthHome;
