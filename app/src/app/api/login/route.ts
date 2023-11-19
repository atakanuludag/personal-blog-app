// ** next
import { cookies } from "next/headers";

// ** service
import service from "@/services";

// ** model
import TokenModel from "@/models/TokenModel";

// ** config
import { EndpointUrls, COOKIE_NAMES } from "@/config";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res: TokenModel | null = await service(`${EndpointUrls.user}/login`, {
      method: "POST",
      body,
    });

    if (!res?.accessToken) {
      return new Response(null, {
        status: 500,
      });
    }

    const cookieStore = cookies();
    cookieStore.set(COOKIE_NAMES.TOKEN, res.accessToken);

    return Response.json(res.accessToken, {
      status: 200,
      headers: { "Set-Cookie": `${COOKIE_NAMES.TOKEN}=${res.accessToken}` },
    });
  } catch (err) {
    return new Response(null, {
      status: 500,
    });
  }
}
