import { NextResponse } from "next/server";
import connectDB from "@/lib/config/config";
import userModel from "@/lib/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Connect to the database
connectDB();

export const POST = async (Request) => {
  try {
    const { Username, Password } = await Request.json();
    const secretKey = process.env.JWT_SECRET_KEY;

    // Validate input fields
    if (!Username || !Password) {
      return NextResponse.json(
        { message: "All the fields are required" },
        { status: 400 }
      );
    }

    // Check if Username already exists
    const UsernameExists = await userModel.findOne({ Username });
    if (UsernameExists) {
      return NextResponse.json(
        { message: "Username already exists, kindly login" },
        { status: 200 }
      );
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(Password, 10);
    const token = jwt.sign(Username, secretKey);
    if (token) {
      // Create a new user in the database
      const newUser = await userModel.create({
        Username: Username,
        Password: hashPassword,
        token: token
      });

      // Send a success response

      console.log(`New User created in the database: ${newUser}`);
      const response = NextResponse.json(
        {
          message: "Registration is successful",
        },
        { status: 201 }
      );
      response.cookies.set("MaphyCookie", token, {
        httpOnly: true, // Ensure the cookie is not accessible via JavaScript
        // Use secure cookies in production
        path: "/", // Cookie applies to the entire site
      });
      return response;
    }
  } catch (error) {
    console.error(`Error during registration: ${error.message}`);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
