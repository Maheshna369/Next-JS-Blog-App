"use client"
import React from "react";

const EditPostModal = () => {
  return (
    <div className="w-screen h-screen fixed inset-0 backdrop-blur-sm flex justify-center items-center z-[200]">
      <div className="h-96 w-96 bg-white border-2 rounded-xl flex flex-coljustify-evenly items-center">
        <div className="flex justify-center items-center gap-3">
          <p className="text-xl font-bold">New Title</p>
          <input className="border-2 rounded-xl" type="text" />
        </div>
        <div className="flex justify-center items-center gap-3">
          <p className="text-xl font-bold">New Text</p>
          <textarea className="border-2 rounded-2xl" name="" id=""></textarea>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
