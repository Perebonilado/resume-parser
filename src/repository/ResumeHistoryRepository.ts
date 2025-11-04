import prisma from "@/lib/prisma";
import { Resume, ResumeHistory } from "../../prisma-dist/client";
import { PrismaClient } from "@prisma/client/scripts/default-index.js";

export interface ResumeHistoryModel extends ResumeHistory {
  resume: Resume;
}

export interface ResumeHistoryRepository {
  create(
    data: {
      userId: number;
      resumeId: number;
    },
    transaction?: PrismaClient
  ): Promise<ResumeHistory>;

  findByResumeId(
    resumeId: number,
    transaction?: PrismaClient
  ): Promise<ResumeHistory[]>;

  findAllByUserId(
    userId: number,
    transaction?: PrismaClient
  ): Promise<ResumeHistoryModel[]>;
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

  public async findAllByUserId(
    userId: number,
    transaction?: PrismaClient
  ): Promise<ResumeHistoryModel[]> {
    try {
      return await (transaction ?? prisma).resumeHistory.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: {
          resume: true,
        },
      });
    } catch (error) {
      throw new Error("Failed to find latest resume history for user");
    }
  }
}
