// ** next
import { cookies } from "next/headers";

// ** service
import UserService from "@/services/UserService";

// ** model
import { BaseErrorModel } from "@/models/BaseModel";

// ** config
import { COOKIE_NAMES } from "@/config";

// ** utils
import FetchError from "@/utils/fetchError";
import nextApiCatch from "@/utils/nextApiCatch";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await UserService.login(body);

    if (res?.isError || !res?.data)
      throw new Error((res as BaseErrorModel).message);

    if (!res.data?.accessToken)
      throw new Error("Kullanıcı adı veya şifreniz yanlış");

    const cookieStore = cookies();
    cookieStore.set(COOKIE_NAMES.TOKEN, res?.data.accessToken);

    return Response.json(res?.data.accessToken, {
      status: 200,
      headers: {
        "Set-Cookie": `${COOKIE_NAMES.TOKEN}=${res?.data.accessToken}`,
      },
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
