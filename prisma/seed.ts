import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const skillAreaData: Prisma.SkillAreaCreateInput[] = [
  {
    title: "Other Thing",
    description: "More stuff",
  },
];
const assessmentData: Prisma.SelfAssessmentCreateInput[] = [
  {
    score: "FIVE",
    user: {
      connect: {
        id: 1,
      },
    },
    skillArea: {
      create: {
        title: "Thing",
        description: "stuff",
      },
    },
  },
];

export async function main() {
  try {
    console.log(`Start seeding ...`);
    for (const u of skillAreaData) {
      const skillArea = await prisma.skillArea.create({
        data: u,
      });
      console.log(`Created skill area with id: ${skillArea.id}`);
    }
    for (const u of assessmentData) {
      const ass = await prisma.selfAssessment.create({
        data: u,
      });
      console.log(`Created self assessment with score: ${ass.score}`);
    }
    console.log(`Seeding finished.`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
