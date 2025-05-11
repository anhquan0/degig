/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ApiResponseInterface } from "@/interface";
import { parseError } from "@/utils/parse-error";

// GET all jobs with filtering options
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters for filtering
    const isPublished = searchParams.get("isPublished") === "true";
    const isActive = searchParams.get("isActive") === "true";
    const isArchived = searchParams.get("isArchived") === "false";
    const isPrivate = searchParams.get("isPrivate") === "false";
    const isFeatured = searchParams.get("isFeatured") === "true";
    const walletAddress = searchParams.get("walletAddress");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};

    if (searchParams.has("isPublished")) filter.isPublished = isPublished;
    if (searchParams.has("isActive")) filter.isActive = isActive;
    if (searchParams.has("isArchived")) filter.isArchived = isArchived;
    if (searchParams.has("isPrivate")) filter.isPrivate = isPrivate;
    if (searchParams.has("isFeatured")) filter.isFeatured = isFeatured;
    if (walletAddress) filter.walletAddress = walletAddress;
    if (search) {
      filter.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    // Get total count for pagination
    const total = await prisma.job.count({ where: filter });

    // Get jobs with pagination
    const jobs = await prisma.job.findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    const response: ApiResponseInterface = {
      statusCode: 200,
      message: "Jobs fetched successfully",
      data: jobs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponseInterface = {
      statusCode: 500,
      message: parseError(error),
    };
    return NextResponse.json(response, { status: 500 });
  }
}
