import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { resolveSimilarRoute } from "@/lib/routing/resolve-similar-route";

function isSeoOrFeedPath(pathname: string): boolean {
  return (
    /^\/(sitemap|rss|robots)(\.|$)/i.test(pathname) ||
    /\.(xml|txt)$/i.test(pathname)
  );
}

export default async function NotFound() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";

  if (isSeoOrFeedPath(pathname)) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold">Página no encontrada</h1>
        <p className="mt-3 text-muted-foreground">
          Esta URL no existe. Para el mapa del sitio usa{" "}
          <Link href="/sitemap.xml" className="underline">
            /sitemap.xml
          </Link>
          .
        </p>
      </div>
    );
  }

  redirect(resolveSimilarRoute(pathname));
}
