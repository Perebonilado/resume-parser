import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {
  UserRepository,
  UserRepositoryImpl,
} from "@/repository/UserRepository";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      // create user in db
      try {
        const userRepository: UserRepository = new UserRepositoryImpl();
        const existingUser = await userRepository.findByEmail(user.email);
        if (existingUser) {
          return true;
        } else {
          await userRepository.create({ email: user.email, name: user.name });
          return true;
        }
      } catch (error) {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions as any);
