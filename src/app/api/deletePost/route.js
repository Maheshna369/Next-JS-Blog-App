import { NextResponse } from "next/server";
import connectDB from "@/lib/config/config";
import blogsModel from "@/lib/models/blogsModel";
import jwt from "jsonwebtoken";

connectDB();
export const POST = async (request) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = request.cookies.get("MaphyCookie")?.value;
  const session = request.cookies.get("_Secure-next-auth.session-token")?.value;
  if (session) {
    const { dbIndex, Username } = await request.json();
    const UsernameExists = await blogsModel.findOne({ Username });
    if (!UsernameExists) {
      return NextResponse.json(
        { message: "Username is not exists in the databse" },
        { status: 400 }
      );
    }
    const deletePost = await blogsModel.updateOne(
      { Username: Username }, // Filter condition
      {
        $pull: {
          Blogs: { _id: dbIndex }, // Remove the blog with the matching _id
        },
      }
    );
    if (deletePost.modifiedCount === 0) {
      return NextResponse.json({ message: "Post not found" }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Post is being Deleted, Successfully !" },
      { status: 200 }
    );
  }
  const { dbIndex } = await request.json();
  const Username = jwt.decode(token, secretKey);
  const UsernameExists = await blogsModel.findOne({ Username });
  if (!UsernameExists) {
    return NextResponse.json(
      { message: "Username is not exists in the databse" },
      { status: 400 }
    );
  }
  const deletePost = await blogsModel.updateOne(
    { Username: Username }, // Filter condition
    {
      $pull: {
        Blogs: { _id: dbIndex }, // Remove the blog with the matching _id
      },
    }
  );
  if (deletePost.modifiedCount === 0) {
    return NextResponse.json({ message: "Post not found" }, { status: 400 });
  }
  return NextResponse.json(
    { message: "Post is being Deleted, Successfully !" },
    { status: 200 }
  );
};
