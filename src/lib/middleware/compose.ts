// lib/middleware/compose.ts
import type { NextApiRequest, NextApiResponse } from "next";

type Middleware = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) => (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export function compose(...middlewares: Middleware[]) {
  return (
    handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
  ) => {
    return middlewares.reduceRight(
      (acc, middleware) => middleware(acc),
      handler
    );
  };
}
