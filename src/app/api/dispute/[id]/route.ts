import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ApiResponseInterface } from "@/interface";
import { parseError } from "@/utils/parse-error";

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = params.id;
    const dispute = await prisma.dispute.findUnique({
      where: { id },
      include: {
        messages: true,
      },
    });

    if (!dispute) {
      throw new Error("Job not found");
    }
    const response: ApiResponseInterface = {
      statusCode: 200,
      message: "dispute fetched successfully",
      data: dispute,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching dispute:", error);
    const response: ApiResponseInterface = {
      statusCode: 500,
      message: parseError(error),
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const id = params.id;
    const { walletAddress, content } = await request.json();

    const disputeMessage = await prisma.disputeMessage.create({
      data: {
        disputeId: id,
        author: walletAddress,
        content,
      },
    });

    if (!disputeMessage) {
      throw new Error("Dispute not found");
    }
    const response: ApiResponseInterface = {
      statusCode: 200,
      message: "dispute fetched successfully",
      data: disputeMessage,
    };
    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponseInterface = {
      statusCode: 500,
      message: parseError(error),
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
