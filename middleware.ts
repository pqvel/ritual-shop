// // /middleware.ts
// import { User } from "next-auth";
// import { headers } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export const middleware = async (request: NextRequest) => {
//   const headersList = headers();
//   const authHeader = headersList.get("authorization");
//   const cookieHeader = headersList.get("cookie");

//   const session = await fetch(url, {
//     headers: {
//       // "authorization": authHeader, //might not be needed
//       cookie: cookieHeader,
//     },
//   });
//   const session: session = await fetch(
//     `${process.env.serverURL}/api/auth/session`,
//     {
//       headers: headers(),
//       // cache: "no-store"
//     }
//   ).then(async (res) => await res.json());

//   const loggedIn = Object.keys(session).length > 0 ? true : false;
//   const pathname = request.nextUrl.pathname;

//   if (pathname != "/admin/login" && !loggedIn) {
//     return NextResponse.redirect(
//       new URL("/admin/login", process.env.serverURL)
//     );
//   }
// };

// export const config = {
//   matcher: ["/admin/:path*"],
// };

// type session = {} | User;
