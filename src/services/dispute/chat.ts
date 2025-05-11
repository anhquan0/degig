import { post } from "@/lib/axios";
import { parseError } from "@/utils/parse-error";
import { isNil } from "lodash";

export async function chat({ id, content, walletAddress }: { id: string; content: string; walletAddress: string }) {
  try {
    if (isNil(id)) {
      throw new Error("id is required");
    }
    if (isNil(content)) {
      throw new Error("content is required");
    }
    if (isNil(walletAddress)) {
      throw new Error("walletAddress data is required");
    }

    const response = await post("/dispute/" + id, { content, walletAddress });
    return {
      disputeMessage: response.data,
      message: response.message,
      result: true,
    };
  } catch (error) {
    return {
      message: parseError(error),
      disputeMessage: null,
      result: false,
    };
  }
}
