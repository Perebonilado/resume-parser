import { Mistral } from "@mistralai/mistralai";
import axios from "axios";
import FormData from 'form-data';
import { Readable } from 'stream';

export interface UploadMistralFileModel {
  id: string;
  object: string;
  bytes: number;
  created_at: number;
  filename: string;
  purpose: string;
  sample_type: string;
  num_lines: number | null;
  source: string;
}

class MistralClient {
  constructor() {
    this.client = new Mistral({
      apiKey: process.env.NEXT_PUBLIC_MISTRAL_API_KEY!,
    });
  }

  protected client: Mistral;
}

export class MistralOcrService extends MistralClient {
  constructor() {
    super();
  }

  private baseUrl = "https://api.mistral.ai/v1";

  public async processPdf(buffer: Buffer, originalFileName: string) {
    try {
      const uploadedPDf = await this.handleUploadForOCR(
        buffer,
        originalFileName
      );
      const signedUrl = await this.retrieveSignedUrl(uploadedPDf.id);
      const processedPDFTexts = await this.processOCRFile(signedUrl.url);
      return processedPDFTexts;
    } catch (error) {
      throw new Error("Failed to process pdf");
    }
  }

  private async handleUploadForOCR(
    buffer: Buffer,
    originalFileName: string
  ): Promise<UploadMistralFileModel> {
    try {
      const form = new FormData();
      const stream = Readable.from(buffer); // Convert buffer to stream

      form.append("purpose", "ocr");
      form.append("file", stream, originalFileName);

      const { data } = await axios.post<UploadMistralFileModel>(
        `${this.baseUrl}/files`,
        form,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_MISTRAL_API_KEY!}`,
              ...form.getHeaders(), // Set proper headers for FormData
            Accept: "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error("Failed to OCR document");
    }
  }

  private async retrieveSignedUrl(id: string) {
    try {
      return await this.client.files.getSignedUrl({ fileId: id });
    } catch (error) {
      throw new Error("Failed to retrieve signed url");
    }
  }

  private async processOCRFile(signedUrl: string) {
    try {
      const ocrResponse = await this.client.ocr.process({
        model: "mistral-ocr-latest",
        document: {
          type: "document_url",
          documentUrl: signedUrl,
        },
      });

      return ocrResponse.pages.map((p) => p.markdown);
    } catch (error) {
      throw new Error("Failed to retrieve signed url");
    }
  }
}
