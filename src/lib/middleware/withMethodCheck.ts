// lib/middleware/withMethodCheck.ts
import type { NextApiRequest, NextApiResponse } from "next";

export function withMethodCheck(allowedMethods: string[]) {
  return (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      if (!allowedMethods.includes(req.method || "")) {
        return res.status(405).json({ 
          error: `Method ${req.method} not allowed. Allowed methods: ${allowedMethods.join(", ")}` 
        });
      }
      
      await handler(req, res);
    };
  };
}