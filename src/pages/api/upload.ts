import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, AuthenticatedRequest } from "@/lib/middleware/withAuth";
import { withErrorHandler } from "@/lib/middleware/withErrorHandler";
import { withMethodCheck } from "@/lib/middleware/withMethodCheck";
import { compose } from "@/lib/middleware/compose";
import { UploadDto } from "@/dto/UploadDto";
import { validateUploadDto } from "@/validation/uploadValidationSchema";
import { resumeUploadHandler } from "@/business/ResumeUploadHandler";

type SuccessResponse = UploadDto;
type ErrorResponse = { error: string };

async function uploadFileHandler(
  req: AuthenticatedRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  // Validate request body
  const uploadData = validateUploadDto(req.body);
  const parsedData = await resumeUploadHandler(uploadData);
  console.log(parsedData);

  // Save to database

  // Return success response
  return res.status(200).json({
    fileName: "",
    fileSize: "",
    fileUrl: "",
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
