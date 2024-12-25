import { NextResponse } from "next/server";
import connectDB from "@/lib/config/config";
import blogsModel from "@/lib/models/blogsModel";

connectDB();
export const POST = async (request) => {
  const { isLike, dbIndex, Username } = await request.json();
  const checkUsername = await blogsModel.findOne({ Username });
  if (!checkUsername) {
    return NextResponse.json(
      { message: `Username is not present in the database` },
      { status: 400 }
    );
  }
  try {
    const result = await blogsModel.updateOne(
      {
        Username: Username, // Find the user
        "Blogs._id": dbIndex, // Match the specific blog post by _id
      },
      {
        $inc: {
          "Blogs.$[elem].Likes": isLike ? -1: 1, // Increment or decrement Likes
        },
      },
      {
        arrayFilters: [{ "elem._id": dbIndex }], // Apply the update only to the specific blog post
        new: true, // Return the updated document
      }
    );
    // Check if any post was updated
    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Blog post not found or already updated" },
        { status: 404 }
      );
    }
    if (isLike) {
      const newIsLike = false;
      return NextResponse.json({ message: newIsLike }, { status: 200 });
    } else {
      const newIsLike = true;
      return NextResponse.json({ message: newIsLike }, { status: 200 });
    }
  } catch (error) {
    console.error("Error while liking the post:", error);
    return NextResponse.json(
      { message: "Error while liking the post", error: error.message },
      { status: 500 }
    );
  }
};
