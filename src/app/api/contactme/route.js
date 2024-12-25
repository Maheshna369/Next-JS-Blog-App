import { NextResponse } from "next/server";
import connectDB from "@/lib/config/config";
import contactUserModel from "@/lib/models/contactUsersModel";

connectDB();
export const POST = async (request) => {
  try {
    const { Name, Age, Gender } = await request.json();
    const PhoneNumber = process.env.PHONE_NUMBER;
    const Email = process.env.EMAIL;
    const Address = process.env.ADDRESS;
    const developerDetails = { PhoneNumber, Email, Address };
    const ContactUserExists = await contactUserModel.findOne(
      { Name },
      { Age },
      { Gender }
    );
    if (ContactUserExists) {
      console.log(
        `Contact User is already exists in database. Details are as follows: ${ContactUserExists}`
      );
      return NextResponse.json(
        { developerDetails: developerDetails },
        { status: 200 }
      );
    }
    const newContactUser = await contactUserModel.create({
      Name: Name,
      Age: Age,
      Gender: Gender,
    });
    console.log(
      `Contact User is being Created in database. Details are as follows: ${newContactUser}`
    );
    return NextResponse.json(
      { developerDetails: developerDetails },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      `Error while creating and fetching contact user data in the database is ${error}`
    );
  }
};
