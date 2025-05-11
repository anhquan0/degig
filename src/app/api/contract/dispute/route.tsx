import { Contract } from "@/contract";
import { ApiResponseInterface } from "@/interface";
import { blockfrostProvider } from "@/lib/blockfrost";
import { parseError } from "@/utils/parse-error";
import { MeshWallet } from "@meshsdk/core";
import { type NextRequest, NextResponse } from "next/server";
import { isNil } from "lodash";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contract, walletAddress } = body;
    if (isNil(contract) || isNil(walletAddress)) {
      throw new Error("Contract and wallet address are required");
    }

    const wallet = new MeshWallet({
      networkId: 0,
      fetcher: blockfrostProvider,
      submitter: blockfrostProvider,
      key: {
        type: "address",
        address: walletAddress,
      },
    });

    if (isNil(wallet)) {
      throw new Error("Wallet not found");
    }

    const sContract: Contract = new Contract({
      wallet: wallet,
      fetcher: blockfrostProvider,
      blockfrostProvider: blockfrostProvider,
    });

    if (isNil(sContract)) {
      throw new Error("Contract not found");
    }
    const unsignedTx: string = await sContract.dispute({
      txHash: contract.txHash,
    });

    if (isNil(unsignedTx)) {
      throw new Error("Failed to create contract");
    }

    const response: ApiResponseInterface = {
      statusCode: 200,
      message: "Contract created successfully",
      data: unsignedTx,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error creating contract:", error);
    const errorResponse: ApiResponseInterface = {
      statusCode: 500,
      message: parseError(error),
      data: null,
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
