// ** config
import { API_URL, COOKIE_NAMES } from "@/config";

// ** third party
import Cookies from "js-cookie";

interface ServiceRequestInit extends RequestInit {
  body?: any;
}

const localeApiUrl = `/api`;

const service = async (
  url: string,
  init?: ServiceRequestInit | undefined,
  localApi: boolean = false
) => {
  let headers: Record<string, any> = {
    ...init?.headers,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const token = Cookies.get(COOKIE_NAMES.TOKEN);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${localApi ? localeApiUrl : API_URL}/${url}`, {
    ...init,
    body: JSON.stringify(init?.body),
    headers,
  });
  if (!res.ok) return null;
  return res.json();
};

export default service;
