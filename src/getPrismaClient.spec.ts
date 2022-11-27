import { getPrismaClient } from "./getPrismaClient";
import * as chai from "chai";
import { PrismaClient } from "@prisma/client";

var expect = chai.expect;

describe("getPrismaClient", function () {
  it("should produce PrismaClient", function () {
    expect(getPrismaClient()).to.be.instanceOf(PrismaClient);
  });
});
