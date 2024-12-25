import connectDB from "@/lib/config/config";
import userModel from "@/lib/models/userModel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDB();
export const POST = async (Request) => {
  try {
    const { Username, Password } = await Request.json();
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!Username || !Password) {
      return NextResponse.json(
        { message: "Fill all the fields" },
        { status: 400 }
      );
    }
    const checkUsername = await userModel.findOne({ Username });
    if (!checkUsername) {
      return NextResponse.json(
        { message: "User is not registered, kindly register !" },
        { status: 200 }
      );
    }
    const hashPassword = checkUsername.Password;
    const isPasswordCorrect = await bcrypt.compare(Password, hashPassword);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Password is incorrect" },
        { status: 200 }
      );
    }
    const token = jwt.sign(Username, secretKey);
    console.log(`Login is successful, user details is : ${checkUsername}`);
    const response = NextResponse.json(
      { message: `Login is Successful` },
      { status: 200 }
    );
    response.cookies.set("MaphyCookie", token, {
      httpOnly: true, // Ensure the cookie is not accessible via JavaScript
      // Use secure cookies in production
      path: "/", // Cookie applies to the entire site
    });
    return response;
  } catch (error) {
    console.error(`Error while login is ${error}`);
  }
};
