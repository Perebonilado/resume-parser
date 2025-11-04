import { compose } from "@/lib/middleware/compose";
import { AuthenticatedRequest, withAuth } from "@/lib/middleware/withAuth";
import { withErrorHandler } from "@/lib/middleware/withErrorHandler";
import { withMethodCheck } from "@/lib/middleware/withMethodCheck";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "../upload";
import {
  ResumeRepositoryImpl,
} from "@/repository/ResumeRepository";
import { Resume } from "../../../../prisma-dist";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]"; // Import your auth config
import { UserRepositoryImpl } from "@/repository/UserRepository";

type SuccessResponse = {
  data: Resume[];
};

async function getResumeByUserId(
  req: AuthenticatedRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  // Pass authOptions to getServerSession
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ error: "Unauthorized" } as ErrorResponse);
  }

  const userRepository = new UserRepositoryImpl();
  const resumeRepository = new ResumeRepositoryImpl();
  
  const user = await userRepository.findByEmail(session.user.email);
  
  if (!user) {
    return res.status(404).json({ error: "User not found" } as ErrorResponse);
  }
  
  const resume = await resumeRepository.findByUserId(user.id);
  res.status(200).json({ data: resume });
}

export default compose(
  withErrorHandler,
  withMethodCheck(["GET"]),
  withAuth
)(
  getResumeByUserId as (
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<void>
);

// Alternative approach if authOptions is in a separate file:
// Create: lib/auth.ts or config/auth.ts
/*
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
// ... other imports

export const authOptions: NextAuthOptions = {
  providers: [
    // your providers
  ],
  // ... rest of your config
};
*/

// Then in your [...nextauth].ts:
/*
import { authOptions } from "@/lib/auth";

export default NextAuth(authOptions);
*/