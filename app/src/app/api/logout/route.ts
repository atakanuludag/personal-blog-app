// ** next
import { cookies } from "next/headers";

// ** config
import { COOKIE_NAMES } from "@/config";

export async function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.delete(COOKIE_NAMES.TOKEN);

    return Response.json(null, {
      status: 200,
    });
  } catch (err) {
    return new Response(null, {
      status: 500,
    });
  }
}
