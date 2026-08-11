import "server-only";
import { headers } from "next/headers";

export async function verifyAdminAuth(): Promise<boolean> {
  const reqHeaders = await headers();
  const basicAuth = reqHeaders.get("authorization");

  if (!basicAuth) {
    return false;
  }

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return false;
  }

  try {
    const authValue = basicAuth.split(" ")[1] ?? "";
    const decodedValue = Buffer.from(authValue, "base64").toString("utf-8");
    const [providedUsername, providedPassword] = decodedValue.split(":");

    if (providedUsername === username && providedPassword === password) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}
