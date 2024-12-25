// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     // Add other providers here
//   ],
//   // Add any other NextAuth configuration here
// });

// export { handler as GET, handler as POST };
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      console.log("JWT Token:", token);
      return token;
    },
    async session({ session, token }) {
      // Pass token info to the session
      session.user.id = token.id;
      session.user.email = token.email;
      console.log("Session Data:", session);
      return session;
    },
  },
});
export { handler as GET, handler as POST };