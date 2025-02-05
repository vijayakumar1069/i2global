export const getUrl = (url) => {
    const backendUrl =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_TEST_BACKEND_URL
      : process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL;
      return backendUrl;
};