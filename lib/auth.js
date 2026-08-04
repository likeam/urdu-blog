import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// In production, store admin credentials in environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        username: { label: "صارف نام", type: "text" },
        password: { label: "پاس ورڈ", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials.username === ADMIN_USERNAME &&
          credentials.password === ADMIN_PASSWORD
        ) {
          return { id: 1, name: "منتظم", email: "admin@blog.com" };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};
