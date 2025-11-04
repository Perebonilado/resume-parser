import prisma from "@/lib/prisma";
import { Resume } from "../../prisma-dist/client";
import { PrismaClient } from "@prisma/client/scripts/default-index.js";

export interface ResumeRepository {
  create(data: {
    userId: number;
    fileName: string;
    fileSize: number;
    fileUrl: string;
    resumeData: Record<string, any>;
  }, transaction?: PrismaClient): Promise<Resume>;

  findById(id: number, transaction?: PrismaClient): Promise<Resume | null>;

  findByUserId(userId: number, transaction?: PrismaClient): Promise<Resume[]>;
}

export class ResumeRepositoryImpl implements ResumeRepository {
  constructor() {}

  public async create(
    data: {
      userId: number;
      fileName: string;
      fileSize: number;
      fileUrl: string;
      resumeData: Record<string, any>;
    },
    transaction?: PrismaClient
  ): Promise<Resume> {
    try {
      return await (transaction ?? prisma).resume.create({ data });
    } catch (error) {
      throw new Error("Failed to create resume");
    }
  }

  public async findById(id: number, transaction?: PrismaClient): Promise<Resume | null> {
    try {
      return await (transaction ?? prisma).resume.findUnique({ where: { id } });
    } catch (error) {
      throw new Error("Failed to find resume by ID");
    }
  }

  public async findByUserId(userId: number, transaction?: PrismaClient): Promise<Resume[]> {
    try {
      return await (transaction ?? prisma).resume.findMany({ where: { userId } });
    } catch (error) {
      throw new Error("Failed to find resumes by user ID");
    }
  }
}
