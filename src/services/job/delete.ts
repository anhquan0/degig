import { del } from "@/lib/axios";
import { parseError } from "@/utils/parse-error";
import { isNil } from "lodash";
export async function deleteJob({ id, walletAddress }: { id: string; walletAddress: string }) {
  try {
    if (isNil(walletAddress)) {
      throw new Error("wallet address are required");
    }

    if (isNil(id)) {
      throw new Error("Job ID is required");
    }

    const response = await del(`/job/${id}?walletAddress=${walletAddress}`);
    return response.message;
  } catch (error) {
    return parseError(error);
  }
}
