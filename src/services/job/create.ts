import { post } from "@/lib/axios";
import { Job as JobParam } from "@/interface";
import { parseError } from "@/utils/parse-error";
export async function createJob({ walletAddress, job }: { walletAddress: string; job: JobParam }) {
  try {
    const { title, description, reward, poc, skills, deadline, applicationLink } = job;
    if (!title || !walletAddress) {
      throw new Error("Title and wallet address are required");
    }
    const prismaJob = {
      title,
      description,
      walletAddress,
      reward,
      poc,
      expriedAt: deadline,
      skills,
      applicationLink,
    };
    const response = await post("/job/create", { walletAddress, prismaJob });
    return response.message;
  } catch (error) {
    return parseError(error);
  }
}
