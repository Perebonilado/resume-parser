import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, AuthenticatedRequest } from "@/lib/middleware/withAuth";
import { withErrorHandler } from "@/lib/middleware/withErrorHandler";
import { withMethodCheck } from "@/lib/middleware/withMethodCheck";
import { compose } from "@/lib/middleware/compose";
import { validateUploadDto } from "@/validation/uploadValidationSchema";
import {
  resumeUploadHandler,
  ResumeUploadModel,
} from "@/business/ResumeUploadHandler";

type SuccessResponse = ResumeUploadModel;
export type ErrorResponse = { error: string };

async function uploadFileHandler(
  req: AuthenticatedRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  // Validate request body
  const uploadData = validateUploadDto(req.body);
  const userEmail = req.userEmail;
  const data = await resumeUploadHandler(uploadData, userEmail);

  // Return success response
  return res.status(201).json({
    ...data,
  });
}

// Apply middleware in order
export default compose(
  withErrorHandler,
  withMethodCheck(["POST"]),
  withAuth
)(
  uploadFileHandler as (
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<void>
);
