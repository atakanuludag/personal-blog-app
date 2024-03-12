// ** utils
import FetchError from "@/utils/fetchError";

const clientFetchInterceptor = () => {
  if (typeof window !== "undefined") {
    const { fetch: originalFetch } = window;

    window.fetch = async (...args) => {
      let [resource, config] = args;

      const response = await originalFetch(resource as URL, config);

      if (!response.ok) {
        const errorResData = await response.json();
        throw new FetchError(response, errorResData?.message);
      }
      return response;
    };
  }
};

export default clientFetchInterceptor;
