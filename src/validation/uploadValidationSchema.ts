// lib/validation/uploadSchema.ts
import { UploadDto } from "@/dto/UploadDto";
import { ValidationError } from "@/lib/middleware/withErrorHandler";

export function validateUploadDto(body: any): UploadDto {
  const errors: string[] = [];

  if (!body.fileName || typeof body.fileName !== "string") {
    errors.push("fileName is required and must be a string");
  }

  if (!body.fileSize || typeof body.fileSize !== "number") {
    errors.push("fileSize is required and must be a string");
  }

  if (!body.fileUrl || typeof body.fileUrl !== "string") {
    errors.push("fileUrl is required and must be a string");
  }


  if (errors.length > 0) {
    throw new ValidationError(errors.join(", "));
  }

  return {
    fileName: body.fileName,
    fileSize: body.fileSize,
    fileUrl: body.fileUrl,
  };
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}