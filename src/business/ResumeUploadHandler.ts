import { bucketName } from "@/constants";
import { UploadDto } from "@/dto/UploadDto";
import { HandlerError } from "@/errors/HandlerError";
import { ExtractTextService } from "@/integrations/ExtractTextService";
import { supabase } from "@/lib/supabase";
import { resumeParserPrompt } from "@/prompts/resumePrompts";
import { validateUploadDto } from "@/validation/uploadValidationSchema";
import { ResumeSchema } from "@/zodSchemas/ResumeSchema";
import { createOpenAI, OpenAIProvider } from "@ai-sdk/openai";
import { generateObject, generateText } from "ai";

export const resumeUploadHandler = async (uploadData: UploadDto) => {
  try {
    // Validate request body
    const file = await supabase.storage
      .from(bucketName)
      .download(uploadData.fileUrl.split("/")[1]);
    console.log(file);
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
    console.log(extractedText)

    // parse data
    const model = createOpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });
    const parsedData = await generateObject({
      model: model.responses("gpt-5-mini"),
      maxRetries: 3,
      mode: "json",
      prompt: resumeParserPrompt(extractedText.join('\n')),
      schemaName: "resume",
      schemaDescription: "Parsed resume data",
      schema: ResumeSchema,
    });

    // save parsed data & history

    return parsedData.object;
  } catch (error) {
    throw new HandlerError("Failed to handle resume upload");
  }
};
