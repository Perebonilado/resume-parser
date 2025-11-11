import { bucketName } from "@/constants";
import { UploadDto } from "@/dto/UploadDto";
import { HandlerError } from "@/errors/HandlerError";
import { ExtractTextService } from "@/integrations/ExtractTextService";
import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { resumeParserPrompt } from "@/prompts/resumePrompts";
import {
  ResumeHistoryRepository,
  ResumeHistoryRepositoryImpl,
} from "@/repository/ResumeHistoryRepository";
import {
  ResumeRepository,
  ResumeRepositoryImpl,
} from "@/repository/ResumeRepository";
import {
  UserRepository,
  UserRepositoryImpl,
} from "@/repository/UserRepository";
import { ResumeSchema } from "@/zodSchemas/ResumeSchema";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { creditHandler } from "./CreditHandler";

export interface ResumeUploadModel {
  resumeId: number;
  resumeHistoryId: number;
}

export const resumeUploadHandler = async (
  uploadData: UploadDto,
  userEmail: string
): Promise<ResumeUploadModel> => {
  try {
    const userRepository: UserRepository = new UserRepositoryImpl();
    const user = await userRepository.findByEmail(userEmail);
    if (!user) {
      throw new Error("user not found");
    }

    const userId = user.id;
    // Validate request body
    const file = await supabase.storage
      .from(bucketName)
      .download(uploadData.fileUrl.split("/")[1]);
    const textExtractionService = new ExtractTextService();
    if (!file.data) {
      console.log("file data unavailable");
      throw new Error("Failed to get file data");
    }
    const buffer = Buffer.from(await file.data.arrayBuffer());
    const extractedText = await textExtractionService.extractChunksFromPDF(
      buffer,
      uploadData.fileName
    );

    // parse data
    const model = createOpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
    });
    const parsedData = await generateObject({
      model: model.responses("gpt-5-mini"),
      maxRetries: 3,
      mode: "json",
      prompt: resumeParserPrompt(extractedText.join("\n")),
      schemaName: "resume",
      schemaDescription: "Parsed resume data",
      schema: ResumeSchema,
    });

    // save parsed data & history
    const resumeRepository: ResumeRepository = new ResumeRepositoryImpl();
    const resumeHistoryRepository: ResumeHistoryRepository =
      new ResumeHistoryRepositoryImpl();

    const resumeData = await prisma.$transaction(async (tx) => {
      const createdResume = await resumeRepository.create(
        {
          fileName: uploadData.fileName,
          fileSize: uploadData.fileSize,
          fileUrl: uploadData.fileUrl,
          resumeData: parsedData.object,
          userId: userId,
        },
        tx
      );

      const resumeHistory = await resumeHistoryRepository.create(
        { userId, resumeId: createdResume.id },
        tx
      );

      await creditHandler({
        email: user.email,
        mutationType: "decrement",
        mutationValue: 100,
      });

      return { createdResume, resumeHistory };
    });

    return {
      resumeId: resumeData.createdResume.id,
      resumeHistoryId: resumeData.resumeHistory.id,
    };
  } catch (error) {
    throw new HandlerError("Failed to handle resume upload");
  }
};
