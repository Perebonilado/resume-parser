// lib/middleware/withAuth.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export type AuthenticatedRequest = NextApiRequest & {
  userEmail: string;
};

export function withAuth(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session?.user?.email) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Attach user info to request
      (req as AuthenticatedRequest).userEmail = session.user.email;

      // Call the actual handler
      await handler(req as AuthenticatedRequest, res);
    } catch (error) {
      console.error("Auth middleware error:", error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };
}