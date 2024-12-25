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
    const { Title, Text } = await request.json();
    const date = new Date();
    const year = date.getFullYear();
    const month = Number(String(date.getMonth() + 1).padStart(2, "0"));
    const day = Number(String(date.getDate()).padStart(2, "0"));
    const UsernameExists = await blogsModel.findOne({ Username });
    if (UsernameExists) {
      const newBlog = await blogsModel.updateOne(
        { Username: Username },
        {
          $push: {
            Blogs: [
              {
                Title: Title,
                Text: Text,
                Date: {
                  Year: year,
                  Month: month,
                  Day: day,
                },
                Likes: 0,
              },
            ],
          },
        }
      );
      console.log(
        `New Post of User : ${Username} has been succeed !. The Post is : ${newBlog}`
      );
      return NextResponse.json(
        { message: "Your Blog has been Posted, Successfully !" },
        { status: 201 }
      );
    }
    const newBlog = await blogsModel.create({
      Username: Username,
      Blogs: [
        {
          Title: Title,
          Text: Text,
          Date: {
            Year: year,
            Month: month,
            Day: day,
          },
          Likes: 0,
        },
      ],
    });
    console.log(
      `New Post of User : ${Username} has been succeed !. The Post is : ${newBlog}`
    );
    return NextResponse.json(
      { message: "Your Blog has been Posted, Successfully !" },
      { status: 201 }
    );
  } catch (err) {
    console.error(`Error while creating post is : ${err}`);
    return NextResponse.json(
      { message: "Error while creating a post" },
      { status: 400 }
    );
  }
};
