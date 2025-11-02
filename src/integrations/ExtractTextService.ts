import { PDFExtract } from "pdf.js-extract";
import { MistralOcrService } from "./MistralService";

interface ExtractedPages {
  textContent: string;
  isScanned: boolean;
}

export class ExtractTextService {
  constructor() {
    this.ocrService = new MistralOcrService();
  }

  private ocrService: MistralOcrService;

  public async extractChunksFromPDF(file: Buffer, originalFileName: string) {
    try {
      const scannedKeywords = ["cam scanner", "camscanner"];
      const pdfExtract = new PDFExtract();
      const data = await pdfExtract.extractBuffer(file, {});
      const extractedPages: ExtractedPages[] = [];
      data.pages.forEach((page) => {
        const textContent = page.content.map((item) => item.str).join(" ");
        const containsScanKeyWords = scannedKeywords.some((kw) =>
          textContent.includes(kw)
        );

        if (!textContent.length || containsScanKeyWords) {
          extractedPages.push({ isScanned: true, textContent: "" });
        } else {
          extractedPages.push({ isScanned: false, textContent: textContent });
        }
      });
      const somePagesAreScanned = extractedPages.some((p) => p.isScanned);

      if (somePagesAreScanned) {
        // map and get text content of scanned pages
        return await this.ocrService.processPdf(file, originalFileName);
      } else {
        return extractedPages.map((e)=>e.textContent);
      }
    } catch (error) {
      // scan pages
      return await this.ocrService.processPdf(file, originalFileName);
    }
  }
}
