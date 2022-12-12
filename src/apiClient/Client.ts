import { SkillArea } from "@prisma/client";
import { TypedHttpClient } from "typed-http-client";
import {
  CreateNewSkillArea,
  SelfAssessmentSummary,
  SkillAreaSummary,
} from "../types";
import * as ApiPathing from "./apiPathing";
import {
  parseSelfAssessmentSummary,
  parseSkillAreaSummary,
  parseSkillAreaSummaryArray,
  parseSubmitAssessmentResponse,
} from "./parsers";

export default class Client {
  httpClient: TypedHttpClient;
  constructor(public baseUrl: URL) {
    this.httpClient = new TypedHttpClient();
  }
  async getAllSkillAreas(): Promise<SkillAreaSummary[]> {
    const response = await this.httpClient.get<SkillAreaSummary[]>(
      { url: ApiPathing.getSkillAreaPath(this.baseUrl) },
      parseSkillAreaSummaryArray
    );
    return response.result;
  }
  async getSelfAssessment(
    skillAreaId: SkillArea["id"]
  ): Promise<SelfAssessmentSummary> {
    const response = await this.httpClient.get<SelfAssessmentSummary>(
      { url: ApiPathing.getSelfAssessmentPath(this.baseUrl, skillAreaId) },
      parseSelfAssessmentSummary
    );
    return response.result;
  }
  async submitAssessment(
    skillAreaId: SkillArea["id"],
    score: number
  ): Promise<void> {
    await this.httpClient.post<void, { score: number }>(
      {
        url: ApiPathing.getSelfAssessmentPath(this.baseUrl, skillAreaId),
        payload: { score },
      },
      parseSubmitAssessmentResponse
    );
  }
  async submitNewSkillArea(
    payload: CreateNewSkillArea
  ): Promise<SkillAreaSummary> {
    const response = await this.httpClient.post<
      SkillAreaSummary,
      CreateNewSkillArea
    >(
      {
        url: ApiPathing.getSkillAreaPath(this.baseUrl),
        payload,
      },
      parseSkillAreaSummary
    );
    return response.result;
  }
}
