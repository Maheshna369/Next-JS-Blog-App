import connectDB from "@/lib/config/config";
import blogsModel from "@/lib/models/blogsModel";
import { NextResponse } from "next/server";

connectDB();
export const GET = async () => {
  try {
    const data = await blogsModel.aggregate([
      { $unwind: "$Blogs" }, // Unwind the Blogs array
      {
        $addFields: {
          // Add a new field that represents the full Date as a JavaScript Date object
          fullDate: {
            $dateFromParts: {
              year: "$Blogs.Date.Year",
              month: "$Blogs.Date.Month",
              day: "$Blogs.Date.Day",
            },
          },
        },
      },
      { $sort: { fullDate: -1 } }, // Sort by the new fullDate field (most recent first)
    ]);
    console.log(`The posts from db being fetched`);
    return NextResponse.json({ message: data }, { status: 200 });
  } catch (error) {
    console.error(
      `Error while fetching all the posts from the database is ${error}`
    );
  }
};
