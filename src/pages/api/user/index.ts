import { compose } from "@/lib/middleware/compose";
import { AuthenticatedRequest, withAuth } from "@/lib/middleware/withAuth";
import { withErrorHandler } from "@/lib/middleware/withErrorHandler";
import { withMethodCheck } from "@/lib/middleware/withMethodCheck";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "../upload";
import {
  UserRepository,
  UserRepositoryImpl,
} from "@/repository/UserRepository";
import { User } from "../../../../prisma-dist";

type SuccessResponse = {
  data: User;
};

async function getUserDetails(
  req: AuthenticatedRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  const userRepository: UserRepository = new UserRepositoryImpl();

  const user = await userRepository.findByEmail(req.userEmail);

  if (!user) throw new Error("User not found");

  return res.status(200).json({ data: user });
}

export default compose(
  withErrorHandler,
  withMethodCheck(["GET"]),
  withAuth
)(
  getUserDetails as (req: NextApiRequest, res: NextApiResponse) => Promise<void>
);
