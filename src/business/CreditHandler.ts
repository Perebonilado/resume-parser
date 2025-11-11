import { HandlerError } from "@/errors/HandlerError";
import { UserRepositoryImpl } from "@/repository/UserRepository";

export interface CreditMutationDto {
  email: string;
  mutationValue: number;
  mutationType: "increment" | "decrement";
}

export interface CreditMutationModel {
  creditValue: number;
}

export const creditHandler = async (
  dto: CreditMutationDto
): Promise<CreditMutationModel> => {
  try {
    const userRepository = new UserRepositoryImpl();
    if (dto.mutationType === "increment") {
      const credits = await userRepository.increaseUserCredit(
        dto.email,
        dto.mutationValue
      );

      return {
        creditValue: credits,
      };
    } else {
      const credits = await userRepository.decreaseUserCredit(
        dto.email,
        dto.mutationValue
      );

      return {
        creditValue: credits,
      };
    }
  } catch (error) {
    throw new HandlerError(`Failed to handle credit ${dto.mutationType}`);
  }
};
