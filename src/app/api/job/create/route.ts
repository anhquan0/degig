import { NextRequest, NextResponse } from "next/server";
import { ApiResponseInterface } from "@/interface";
import { parseError } from "@/utils/parse-error";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, prismaJob } = await request.json();
    if (!prismaJob.title || !walletAddress) {
      throw new Error("Title and wallet address are required");
    }
    await prisma.job.create({
      data: {
        title: prismaJob.title,
        description: prismaJob.description,
        walletAddress: walletAddress,
        reward: parseInt(prismaJob.reward),
        poc: prismaJob.poc,
        publishedAt: new Date(),
        expriedAt: new Date(prismaJob.expriedAt),
        skills: prismaJob.skills,
        applicationLink: prismaJob.applicationLink,
      },
    });

    return NextResponse.json<ApiResponseInterface>(
      {
        statusCode: 200,
        message: "Job created successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json<ApiResponseInterface>(
      {
        statusCode: 500,
        message: parseError(error),
      },
      { status: 500 },
    );
  }
}
