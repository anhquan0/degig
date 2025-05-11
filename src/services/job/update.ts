import { put } from "@/lib/axios";
import { Job as JobParam } from "@/interface";
import { parseError } from "@/utils/parse-error";
import { isNil } from "lodash";
export async function updateJob({ id, walletAddress, jobUpdate }: { id: string; walletAddress: string; jobUpdate: JobParam }) {
  try {
    if (isNil(walletAddress)) {
      throw new Error("wallet address are required");
    }
    if (isNil(id)) {
      throw new Error("Job ID is required");
    }

    const newJob = {
      title: jobUpdate.title,
      description: jobUpdate.description,
      reward: jobUpdate.reward,
      poc: jobUpdate.poc,
      isActive: jobUpdate,
      isArchived: jobUpdate,
      isDraft: jobUpdate,
      isPrivate: jobUpdate,
      expriedAt: jobUpdate.deadline,
      skills: jobUpdate.skills,
      applicationLink: jobUpdate.applicationLink,
    };

    const response = await put(`/job/${id}`, { walletAddress, job: newJob });
    return response.message;
  } catch (error) {
    return parseError(error);
  }
}
