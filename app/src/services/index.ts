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
    ...init?.headers,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const token = Cookies.get(COOKIE_NAMES.TOKEN);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (init?.isFormData) delete headers["Content-Type"];

  const res = await fetch(
    `${init?.isLocalApi ? localeApiUrl : API_URL}/${url}`,
    {
      ...init,
      body: init?.isFormData ? init?.body : JSON.stringify(init?.body),
      headers,
    }
  );

  if (!res.ok || init?.method === "DELETE") return null;
  return res?.json();
};

export default service;
