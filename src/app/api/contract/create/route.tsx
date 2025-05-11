import { Contract } from "@/contract";
import { ApiResponseInterface } from "@/interface";
import { blockfrostProvider } from "@/lib/blockfrost";
import { parseError } from "@/utils/parse-error";
import { MeshWallet } from "@meshsdk/core";
import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { isNil } from "lodash";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobId, ...data } = body;
    if (!jobId) {
      throw new Error("Job ID is required");
    }

    if (!data.partyA || !data.partyB || !data.reward) {
      throw new Error("Missing required fields");
    }

    const jsonString = JSON.stringify(data, null, 2);
    const file = new File([jsonString], `${jobId}.json`, { type: "application/json" });
    const formData = new FormData();
    formData.append("file", file);
    formData.append("network", "public");

    if (isNil(formData)) {
      throw new Error("Failed to create JSON string");
    }

    const uploadResponse = await axios.post("https://uploads.pinata.cloud/v3/files", formData, {
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (uploadResponse.status !== 200) {
      throw new Error("Failed to upload file to IPFS");
    }
    if (isNil(uploadResponse.data.data.cid)) {
      throw new Error("Failed to get IPFS CID");
    }

    const wallet = new MeshWallet({
      networkId: 0,
      fetcher: blockfrostProvider,
      submitter: blockfrostProvider,
      key: {
        type: "address",
        address: data.partyA,
      },
    });

    if (isNil(wallet)) {
      throw new Error("Wallet not found");
    }

    const contract: Contract = new Contract({
      wallet: wallet,
      fetcher: blockfrostProvider,
      blockfrostProvider: blockfrostProvider,
    });

    if (isNil(contract)) {
      throw new Error("Contract not found");
    }
    const unsignedTx: string = await contract.create({
      content: uploadResponse.data.data.cid,
      aParty: data.partyA,
      bParty: data.partyB,
      amount: data.reward,
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
