import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = (request) => {
  try {
    const token = request.cookies.get("MaphyCookie")?.value;
    const session = request.cookies.get("next-auth.session-token")?.value;
    if (!token && !session) {
      //   const payload = "";
      return NextResponse.json({ payload: "" });
    } else if (session) {
      return NextResponse.json({ payload: "exists" });
    } else if (token) {
      const payload = jwt.decode(token);
      return NextResponse.json({ payload: payload });
    }
  } catch (error) {
    console.error(`Error while retrieving the payload from token is ${error}`);
  }
};
