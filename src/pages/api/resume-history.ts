import { compose } from "@/lib/middleware/compose";
import { AuthenticatedRequest, withAuth } from "@/lib/middleware/withAuth";
import { withErrorHandler } from "@/lib/middleware/withErrorHandler";
import { withMethodCheck } from "@/lib/middleware/withMethodCheck";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "./upload";
import { UserRepositoryImpl } from "@/repository/UserRepository";
import {
    ResumeHistoryModel,
  ResumeHistoryRepository,
  ResumeHistoryRepositoryImpl,
} from "@/repository/ResumeHistoryRepository";

type SuccessResponse = {
  data: ResumeHistoryModel[];
};

async function getResumeHistory(
  req: AuthenticatedRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  const userEmail = req.userEmail;

  const userRepository = new UserRepositoryImpl();
  const resumeHistoryRepository: ResumeHistoryRepository =
    new ResumeHistoryRepositoryImpl();
  const user = await userRepository.findByEmail(userEmail);

  if (!user) {
    return res.status(404).json({ error: "User not found" } as ErrorResponse);
  }

  const resumeHistory = await resumeHistoryRepository.findAllByUserId(user.id);

  return res.status(200).json({ data: resumeHistory });
}

export default compose(
  withErrorHandler,
  withMethodCheck(["GET"]),
  withAuth
)(
  getResumeHistory as (
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<void>
);
