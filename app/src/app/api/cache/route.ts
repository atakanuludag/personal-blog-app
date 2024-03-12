import CacheBodyModel from "@/models/CacheBodyModel";
import FetchError from "@/utils/fetchError";
import nextApiCatch from "@/utils/nextApiCatch";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: CacheBodyModel = await req.json();

    if (!body?.path) throw new Error("Path bilgisi bulunamadı");

    revalidatePath(body.path, body.type);
    return Response.json({
      isError: false,
      now: Date.now(),
      message: "Cache temizlendi.",
    });
  } catch (err) {
    if ((err as FetchError).isFetchErr) {
      const fetchError = err as FetchError;
      return nextApiCatch({
        message: fetchError?.message,
        statusCode: fetchError.errResponse.status,
      });
    }

    const error = err as Error;
    return nextApiCatch({
      message: error?.message,
      statusCode: 500,
    });
  }
}
