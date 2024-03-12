// ** next
import { cookies } from "next/headers";

// ** config
import { COOKIE_NAMES } from "@/config";

// ** utils
import nextApiCatch from "@/utils/nextApiCatch";

export async function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.delete(COOKIE_NAMES.TOKEN);

    return Response.json(
      {
        hasError: false,
        message: "Başarıyla çıkış yapıldı.",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    const error = err as Error;
    return nextApiCatch({
      message: error?.message,
      statusCode: 500,
    });
  }
}
