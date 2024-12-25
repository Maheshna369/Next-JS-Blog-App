import connectDB from "@/lib/config/config";
import blogsModel from "@/lib/models/blogsModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
connectDB();
export const POST = async (request) => {
  try {
    const token = request.cookies.get("MaphyCookie")?.value;
    const secretKey = process.env.JWT_SECRET_KEY;
    const Username = jwt.decode(token, secretKey);
    if (!Username) {
      return NextResponse.json(
        { message: "Username is not present or can't be fetched by db" },
        { status: 400 }
      );
    }
    const UsernameExists = await blogsModel.findOne({ Username });
    if (!UsernameExists) {
      return NextResponse.json(
        { message: "User is not present in the database, kindly register !" },
        { status: 400 }
      );
    }
    const posts = [...UsernameExists.Blogs].reverse();

    return NextResponse.json(
      { posts: posts }, // Return the combined blogs array
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error while fetching blogs: ${error}`);
    return NextResponse.json(
      { message: "Error while fetching blogs" },
      { status: 400 }
    );
  }
};
