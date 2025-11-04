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
      clientId: "1047441427507-vr362p8240491lmna821sd96bi94uo43.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  secret: "fKAiumroLqkFdJHDwQDcT+g/BtG7hFGUfRQT8ZW/gsc=" ,
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
