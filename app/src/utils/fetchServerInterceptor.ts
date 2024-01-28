// ** next
import { notFound } from "next/navigation";

// ** utils
import FetchError from "@/utils/fetchError";

const serverFetchInterceptor = () => {
  if (typeof global !== "undefined") {
    const { fetch: originalFetch } = global;

    global.fetch = async (...args) => {
      let [resource, config] = args;

      const response = await originalFetch(resource as URL, config);

      if (response.status === 404) return notFound();

      if (!response.ok) {
        const errorResData = await response.json();
        throw new FetchError(response, errorResData?.message);
      }

      return response;
    };
  }
};

export default serverFetchInterceptor;
