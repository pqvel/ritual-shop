// import type { User as UserType } from "@prisma/client";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       //this field is not necessary
//       //unless you use the built-in form.
//       //However it also gives us our "credentials" type below.

//       credentials: {
//         login: { label: "username" },
//         password: { label: "password", type: "password" },
//       },

//       //the credentials are passed with our
//       //login form.
//       async authorize(credentials) {
//         //verify our credentials using the route
//         //we created above
//         const user: customUser | null = await fetch(
//           `${process.env.serverURL}/api/verification`,
//           {
//             method: "POST",
//             body: JSON.stringify(credentials),
//             cache: "no-cache", //! To be removed after done testing
//           }
//         ).then(async (res) => {
//           if (res.ok) return await res.json();
//           else return null;
//         });

//         if (user && user.username) {
//           const sessionUser: User = {
//             id: user.id, // required string !!!
//             name: user.username, // undefined | null | string
//             email: undefined, // undefined | null | string
//             image: undefined, // undefined | null | string
//           };

//           return sessionUser;
//         }

//         return null;
//       },
//     }),
//   ],

//   //remove this field
//   //if you use the built-in form
//   pages: {
//     signIn: "/admin/login", //default is /api/auth/signin
//     //this will redirect us
//     //to our custom login page
//     //including an error searchParam
//     //if there is an issue.
//   },
// });

// export { handler as POST, handler as GET };
