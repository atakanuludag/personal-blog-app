// ** next
import { MetadataRoute } from "next/types";
import { headers } from "next/headers";

// ** config
import { APP_URL } from "@/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
