import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ApiResponseInterface } from "@/interface";
import { parseError } from "@/utils/parse-error";
import { isNil } from "lodash";

// GET a single job by ID
export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = params.id;

    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      throw new Error("Job not found");
    }
    const response: ApiResponseInterface = {
      statusCode: 200,
      message: "Job fetched successfully",
      data: job,
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

// PUT update a job
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = params.id;
    const body = await request.json();
    const { walletAddress } = body;
    if (isNil(walletAddress)) {
      throw new Error("wallet address are required");
    }

    // Check if job exists
    const existingJob = await prisma.job.findUnique({
      where: { id: id, walletAddress: walletAddress },
    });

    if (!existingJob) {
      throw new Error("Job not found");
    }

    // Handle publishing status change
    // Update job
    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        poc: body.poc,
        isPublished: body.isPublished,
        isActive: body.isActive,
        isArchived: body.isArchived,
        isFeatured: body.isFeatured,
        isDraft: body.isDraft,
        isPrivate: body.isPrivate,
        publishedAt: body.isPublished,
        expriedAt: body.reward,
        applicationLink: body.applicationLink,
        skills: body.skills,
      },
    });
    if (!updatedJob) {
      throw new Error("Failed to update job");
    }
    const response: ApiResponseInterface = {
      statusCode: 200,
      message: "Job updated successfully",
      data: updatedJob,
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

// DELETE a job
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get("walletAddress");
  try {
    const { id } = params;
    if (isNil(walletAddress)) {
      throw new Error("wallet address are required");
    }
    if (isNil(id)) {
      throw new Error("Job ID is required");
    }

    const existingJob = await prisma.job.findUnique({
      where: { id: id, walletAddress: walletAddress },
    });

    if (!existingJob) {
      throw new Error("Job not found");
    }
    await prisma.job.delete({
      where: { id },
    });

    const response: ApiResponseInterface = {
      statusCode: 200,
      message: "Job deleted successfully",
      data: null,
    };

    return NextResponse.json(response, { status: response.statusCode });
  } catch (error) {
    const response: ApiResponseInterface = {
      statusCode: 500,
      message: parseError(error),
      data: null,
    };
    return NextResponse.json(response, { status: response.statusCode });
  }
}
