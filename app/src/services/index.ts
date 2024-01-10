// ** config
import { API_URL, COOKIE_NAMES } from "@/config";

// ** third party
import Cookies from "js-cookie";

interface ServiceRequestInit extends RequestInit {
  readonly body?: any;
  readonly isLocalApi?: boolean;
  readonly isFormData?: boolean;
}

const localeApiUrl = `/api`;

const service = async (url: string, init?: ServiceRequestInit | undefined) => {
  let headers: Record<string, any> = {
    // "Content-Type": "application/json",
    Accept: "application/json",
    ...init?.headers,
  };
  const token = Cookies.get(COOKIE_NAMES.TOKEN);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(
    `${init?.isLocalApi ? localeApiUrl : API_URL}/${url}`,
    {
      body: !init?.isFormData ? JSON.stringify(init?.body) : init?.body,
      headers,
      ...init,
    }
  );

  if (!res.ok || init?.method === "DELETE") return null;
  return res?.json();
};

export default service;
