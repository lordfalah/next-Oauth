import { connectDB } from "@utils/libs/database";
import prisma from "@utils/libs/prisma";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      profile(profile) {
        return {
          ...profile,
          id: profile.sub,
          role: "user",
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },

    async session({ session, token }) {
      if (session) {
        const sessionUser = await prisma.user.findUnique({
          where: {
            email: session?.user?.email,
          },
        });

        if (sessionUser) {
          session.user.id = sessionUser.id.toString();
          session.user.image = sessionUser.image;
          session.user.role = sessionUser.role;
        }
      }
      return session;
    },

    async signIn({ profile }) {
      try {
        await connectDB();
        const userExist = await prisma.user.findUnique({
          where: {
            email: profile?.email,
          },
        });

        if (!userExist) {
          await prisma.user.create({
            data: {
              email: profile?.email,
              username: profile?.name?.replace(" ", "").toLowerCase(),
              image: profile?.picture,
            },
          });
        }

        return true;
      } catch (error) {
        return null;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
