import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { resolveSimilarRoute } from "@/lib/routing/resolve-similar-route";

export default async function NotFound() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  redirect(resolveSimilarRoute(pathname));
}
