import { ApiResponseInterface } from "@/interface";
import prisma from "@/lib/prisma";
import { parseError } from "@/utils/parse-error";

export async function GET() {
  try {
    const disputes = await prisma.dispute.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const response: ApiResponseInterface = {
      statusCode: 200,
      message: "Disputes fetched successfully",
      data: disputes,
    };

    return Response.json(response, { status: 200 });
  } catch (e) {
    const response: ApiResponseInterface = {
      statusCode: 500,
      message: parseError(e),
      data: null,
    };

    return Response.json(response, { status: 500 });
  }
}
