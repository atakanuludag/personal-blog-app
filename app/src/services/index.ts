// ** config
import { API_URL, COOKIE_NAMES } from "@/config";

// ** third party
import Cookies from "js-cookie";

// ** models
import { BaseErrorModel, BaseModel } from "@/models/BaseModel";

// ** utils
import fetchClientInterceptor from "@/utils/fetchClientInterceptor";

fetchClientInterceptor();

interface ServiceRequestInit extends RequestInit {
  body?: any;
  readonly isLocalApi?: boolean;
  readonly isFormData?: boolean;
}

const localeApiUrl = `/api`;

const service = async <T>(
  url: string,
  init?: ServiceRequestInit | undefined
): Promise<BaseModel<T> | BaseErrorModel | null> => {
  let headers: Record<string, any> = {
    ...init?.headers,
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  };
  const token = Cookies.get(COOKIE_NAMES.TOKEN);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (init?.isFormData) delete headers["Content-Type"];

  if (init?.method !== "GET" && init?.body) {
    init = {
      ...init,
      body: init?.isFormData ? init?.body : JSON.stringify(init?.body),
    };
  }

  const res = await fetch(
    `${init?.isLocalApi ? localeApiUrl : API_URL}/${url}`,
    {
      ...init,
      headers,
      cache: init?.cache ?? "no-store",
    }
  );

  if (!res.ok || init?.method === "DELETE") return null;

  return res?.json();
};

export default service;
