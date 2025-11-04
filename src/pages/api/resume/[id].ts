import { compose } from "@/lib/middleware/compose";
import { AuthenticatedRequest, withAuth } from "@/lib/middleware/withAuth";
import { withErrorHandler } from "@/lib/middleware/withErrorHandler";
import { withMethodCheck } from "@/lib/middleware/withMethodCheck";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "../upload";
import { Resume } from "@/zodSchemas/ResumeSchema";
import {
  ResumeRepository,
  ResumeRepositoryImpl,
} from "@/repository/ResumeRepository";

type SuccessResponse = {
  data: Resume;
};

async function getResumeById(
  req: AuthenticatedRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  const resumeRepository: ResumeRepository = new ResumeRepositoryImpl();
  const { id } = req.query;
  console.log(id)
  const resumeData = await resumeRepository.findById(Number(id));
  return res.status(200).json({
    data: (resumeData?.resumeData as unknown as Resume | undefined | null) ?? <Resume>{}
  });
}

export default compose(
  withErrorHandler,
  withMethodCheck(["GET"]),
  withAuth
)(
  getResumeById as (req: NextApiRequest, res: NextApiResponse) => Promise<void>
);
