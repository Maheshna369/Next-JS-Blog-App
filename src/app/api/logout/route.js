import { NextResponse } from "next/server";

export const POST = () => {
  try {
    const response = NextResponse.json(
      { message: "Logout is Successful" },
      { status: 200 }
    );
    // const session = response.cookies.get("next-auth.session-token");
    // if (session) {
    //   response.cookies.set("next-auth.session-token", "", {
    //     httpOnly: true, // Ensure the cookie is not accessible via JavaScript
    //     // Use secure cookies in production
    //     path: "/", // Cookie applies to the entire site
    //     expires: new Date(0), // Expire the cookie immediately
    //   });
    // }
    response.cookies.set("MaphyCookie", "", {
      httpOnly: true, // Ensure the cookie is not accessible via JavaScript
      // Use secure cookies in production
      path: "/", // Cookie applies to the entire site
      expires: new Date(0), // Expire the cookie immediately
    });

    return response;
  } catch (error) {
    console.error(`Error while Logout is ${error}`);
    return NextResponse.json(
      { message: "Error while Logout" },
      { status: 400 }
    );
  }
};
