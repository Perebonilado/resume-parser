import prisma from "@/lib/prisma";
import { User } from "../../prisma-dist/client";
import { CreateUserModel } from "@/models/CreateUserModel";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(model: CreateUserModel): Promise<User>;
  findById(id: number): Promise<User | null>;
}

export class UserRepositoryImpl implements UserRepository {
  constructor() {}

  public async findByEmail(email: string): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new Error("Failed to find user by email");
    }
  }

  public async create(model: CreateUserModel): Promise<User> {
    try {
      return await prisma.user.create({ data: { ...model } });
    } catch (error) {
      throw new Error("Failed to handle user creation");
    }
  }

  public async findById(id: number): Promise<User | null> {
    try {
      return await prisma.user.findUnique({ where: { id } });
    } catch (error) {
      throw new Error("Failed to find user by ID");
    }
  }
}
