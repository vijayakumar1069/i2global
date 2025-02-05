import { cookies } from "next/headers";
export const getCookie = async () => {
  const cookieStore = await cookies();

  // Retrieve token from cookies
  const token = cookieStore.get("access_token")?.value;
  return token;
};
