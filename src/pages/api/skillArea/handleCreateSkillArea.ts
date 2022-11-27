import { NextApiRequest, NextApiResponse } from "next";
import { getPrismaClient } from "../../../getPrismaClient";
import { assertIsCreateNewSkillArea } from "../../../typePredicates";
import { SkillAreaSummary } from "../../../types";
import { createSkillArea } from "./createSkillArea";

export async function handleCreateSkillArea(
  request: NextApiRequest,
  response: NextApiResponse<SkillAreaSummary>
) {
  assertIsCreateNewSkillArea(request.body);
  const {
    body: { description },
  } = request;
  if (description.length === 0) {
    throw new TypeError(
      `Unrecognized skill area description format: ${description}`
    );
  }
  const prisma = getPrismaClient();
  const summary = await createSkillArea(prisma, description);
  response.json(summary);
}
