// lib/middleware/withErrorHandler.ts (updated)
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

export function withErrorHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error("API Error:", error);
      
      // Handle Zod validation errors
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation error",
          details: error.message
        });
      }
      
      // Handle custom errors
      if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.message });
      }
      
      if (error instanceof UnauthorizedError) {
        return res.status(401).json({ error: error.message });
      }
      
      // Generic error
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}