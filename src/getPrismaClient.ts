import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function getPrismaClient(): PrismaClient {
  return prisma;
}
