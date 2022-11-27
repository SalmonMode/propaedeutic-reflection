import { PrismaClient } from "@prisma/client";
import { SinonStubbedInstance } from "sinon";

export type Context = {
  prisma: PrismaClient;
};

export type MockContext = {
  prisma: SinonStubbedInstance<PrismaClient<any, any, any>>;
};
