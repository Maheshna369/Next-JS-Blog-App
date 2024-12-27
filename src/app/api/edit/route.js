import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import blogsModel from "@/lib/models/blogsModel";
import connectDB from "@/lib/config/config";

connectDB();

export const POST = async (request) => {
  try {
    
    const token = request.cookies.get("MaphyCookie")?.value;
    const session = request.cookies.get("_Secure-next-auth.session-token")?.value;
    if (session) {
      const { dbIndex, newTitle, newText, Username } = await request.json();
      if (!Username) {
        return NextResponse.json(
          { message: "Invalid or expired token" },
          { status: 400 }
        );
      }

      const UsernameExists = await blogsModel.findOne({ Username });
      if (!UsernameExists) {
        return NextResponse.json(
          { message: "Username is not present in the database" },
          { status: 400 }
        );
      }

      const dbIndexExists = await blogsModel.findOne({ "Blogs._id": dbIndex });
      if (!dbIndexExists) {
        return NextResponse.json(
          { message: "Blog is not present in the database" },
          { status: 400 }
        );
      }

      const result = await blogsModel.updateOne(
        { Username, "Blogs._id": dbIndex },
        {
          $set: {
            "Blogs.$.Title": newTitle,
            "Blogs.$.Text": newText,
          },
        }
      );

      // Log result for debugging
      console.log("Update result:", result);

      if (result.modifiedCount === 0) {
        return NextResponse.json(
          { message: "No changes made to the blog" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { message: "Your Post is being Edited Successfully !" },
        { status: 200 }
      );
    }
    const { dbIndex, newTitle, newText } = await request.json();
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!token) {
      return NextResponse.json(
        { message: "Token is missing" },
        { status: 400 }
      );
    }

    const Username = jwt.decode(token, secretKey);
    if (!Username) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const UsernameExists = await blogsModel.findOne({ Username });
    if (!UsernameExists) {
      return NextResponse.json(
        { message: "Username is not present in the database" },
        { status: 400 }
      );
    }

    const dbIndexExists = await blogsModel.findOne({ "Blogs._id": dbIndex });
    if (!dbIndexExists) {
      return NextResponse.json(
        { message: "Blog is not present in the database" },
        { status: 400 }
      );
    }

    const result = await blogsModel.updateOne(
      { Username, "Blogs._id": dbIndex },
      {
        $set: {
          "Blogs.$.Title": newTitle,
          "Blogs.$.Text": newText,
        },
      }
    );

    // Log result for debugging
    console.log("Update result:", result);

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No changes made to the blog" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Your Post is being Edited Successfully !" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      `Error while updating or editing a post in backend is ${error}`
    );
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
};
