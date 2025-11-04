import prisma from "@/lib/prisma";
import { User } from "../../prisma-dist/client";
import { CreateUserModel } from "@/models/CreateUserModel";
import { PrismaClient } from "@prisma/client/scripts/default-index.js";

export interface UserRepository {
  findByEmail(email: string, transaction?: PrismaClient): Promise<User | null>;
  create(model: CreateUserModel, transaction?: PrismaClient): Promise<User>;
  findById(id: number, transaction?: PrismaClient): Promise<User | null>;
}

export class UserRepositoryImpl implements UserRepository {
  constructor() {}

  public async findByEmail(email: string, transaction?: PrismaClient): Promise<User | null> {
    try {
      return await (transaction ?? prisma).user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new Error("Failed to find user by email");
    }
  }

  public async create(model: CreateUserModel, transaction?: PrismaClient): Promise<User> {
    try {
      return await (transaction ?? prisma).user.create({ data: { ...model } });
    } catch (error) {
      throw new Error("Failed to handle user creation");
    }
  }

  public async findById(id: number, transaction?: PrismaClient): Promise<User | null> {
    try {
      return await (transaction ?? prisma).user.findUnique({ where: { id } });
    } catch (error) {
      throw new Error("Failed to find user by ID");
    }
  }
}
