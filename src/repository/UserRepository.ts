import prisma from "@/lib/prisma";
import { User } from "../../prisma-dist/client";
import { CreateUserModel } from "@/models/CreateUserModel";
import { PrismaClient } from "@prisma/client/scripts/default-index.js";

export interface UserRepository {
  findByEmail(email: string, transaction?: PrismaClient): Promise<User | null>;
  create(model: CreateUserModel, transaction?: PrismaClient): Promise<User>;
  findById(id: number, transaction?: PrismaClient): Promise<User | null>;
  increaseUserCredit(
    email: string,
    count: number,
    transaction?: PrismaClient
  ): Promise<number>;
  decreaseUserCredit(
    email: string,
    count: number,
    transaction?: PrismaClient
  ): Promise<number>;
}

export class UserRepositoryImpl implements UserRepository {
  constructor() {}

  public async findByEmail(
    email: string,
    transaction?: PrismaClient
  ): Promise<User | null> {
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

  public async create(
    model: CreateUserModel,
    transaction?: PrismaClient
  ): Promise<User> {
    try {
      return await (transaction ?? prisma).user.create({ data: { ...model } });
    } catch (error) {
      throw new Error("Failed to handle user creation");
    }
  }

  public async findById(
    id: number,
    transaction?: PrismaClient
  ): Promise<User | null> {
    try {
      return await (transaction ?? prisma).user.findUnique({ where: { id } });
    } catch (error) {
      throw new Error("Failed to find user by ID");
    }
  }

  public async increaseUserCredit(
    email: string,
    count: number
  ): Promise<number> {
    try {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          credits: {
            increment: count,
          },
        },
        select: {
          credits: true,
        },
      });

      return updatedUser.credits;
    } catch (error) {
      throw new Error("Failed to increase user credits");
    }
  }

  public async decreaseUserCredit(
    email: string,
    count: number
  ): Promise<number> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { credits: true },
      });

      if (!user) {
        throw new Error(`User with email ${email} not found`);
      }

      if (user.credits < count) {
        throw new Error(
          `Insufficient credits. Required: ${count}, Available: ${user.credits}`
        );
      }

      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          credits: {
            decrement: count,
          },
        },
        select: {
          credits: true,
        },
      });

      return updatedUser.credits;
    } catch (error) {
      throw new Error("Failed to decrease user credits");
    }
  }
}
