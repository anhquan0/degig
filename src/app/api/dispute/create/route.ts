import { NextRequest, NextResponse } from "next/server";
import { ApiResponseInterface } from "@/interface";
import { parseError } from "@/utils/parse-error";
import { isNil } from "lodash";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { contract, reason } = await request.json();
    if (isNil(contract)) {
      throw new Error("Title and wallet address are required");
    }

    const dispute = await prisma.dispute.create({
      data: {
        partyA: contract.partyA,
        partyB: contract.partyB,
        txHash: contract.txhash,
        submission: contract.submission,
        content: contract.content,
        reason: reason,
        status: "OPEN",
      },
    });
    return NextResponse.json<ApiResponseInterface>(
      {
        statusCode: 200,
        message: "Dispute created successfully",
        data: dispute.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error creating dispute:", error);
    return NextResponse.json<ApiResponseInterface>(
      {
        statusCode: 500,
        message: parseError(error),
        data: null,
      },
      { status: 500 },
    );
  }
}
