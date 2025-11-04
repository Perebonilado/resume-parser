import prisma from "@/lib/prisma";
import { ResumeHistory } from "../../prisma-dist/client";
import { PrismaClient } from "@prisma/client/scripts/default-index.js";

export interface ResumeHistoryRepository {
  create(data: {
    userId: number;
    resumeId: number;
  }, transaction?: PrismaClient): Promise<ResumeHistory>;

  findByResumeId(resumeId: number, transaction?: PrismaClient): Promise<ResumeHistory[]>;

  findLatestByUserId(userId: number, transaction?: PrismaClient): Promise<ResumeHistory | null>;
}

export class ResumeHistoryRepositoryImpl implements ResumeHistoryRepository {
  constructor() {}

  public async create(
    data: { userId: number; resumeId: number },
    transaction?: PrismaClient
  ): Promise<ResumeHistory> {
    try {
      return await (transaction ?? prisma).resumeHistory.create({ data });
    } catch (error) {
      throw new Error("Failed to create resume history");
    }
  }

  public async findByResumeId(
    resumeId: number,
    transaction?: PrismaClient
  ): Promise<ResumeHistory[]> {
    try {
      return await (transaction ?? prisma).resumeHistory.findMany({
        where: { resumeId },
      });
    } catch (error) {
      throw new Error("Failed to find resume history by resume ID");
    }
  }

  public async findLatestByUserId(
    userId: number,
    transaction?: PrismaClient
  ): Promise<ResumeHistory | null> {
    try {
      return await (transaction ?? prisma).resumeHistory.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      throw new Error("Failed to find latest resume history for user");
    }
  }
}
