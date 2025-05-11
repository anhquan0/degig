import { Contract } from "@/interface";
import { post } from "@/lib/axios";
import { parseError } from "@/utils/parse-error";
import { isNil } from "lodash";

export async function createDisputeTx({ txHash, walletAddress }: { txHash: string; walletAddress: string }) {
  try {
    if (isNil(txHash)) {
      throw new Error("txhash is required");
    }
    if (isNil(walletAddress)) {
      throw new Error("walletAddress data is required");
    }

    const response = await post("/contract/dispute", { txHash, walletAddress });
    return {
      tx: response.data,
      message: response.message,
    };
  } catch (error) {
    return {
      message: parseError(error),
      tx: null,
    };
  }
}

export async function createDisputeDB({ contract, reason }: { contract: Contract; reason: string }) {
  try {
    if (isNil(contract)) {
      throw new Error("txhash is required");
    }

    const response = await post("/dispute/create", { contract, reason });
    return {
      dísputeId: response.data,
      result: true,
      message: response.message,
    };
  } catch (error) {
    return {
      disputeId: null,
      message: parseError(error),
      result: false,
    };
  }
}
