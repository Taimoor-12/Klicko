import { Navbar } from "@/components/dashboard/navbar";
import { ExternalLink } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { userApi } from "@/lib/api";
import { cookies } from "next/headers";
import { LongUrlInputWrapper } from "@/components/dashboard/long-url-input-wrapper";
import { LinksTable } from "@/components/dashboard/links-table";
import { PaginationDashboard } from "@/components/dashboard/pagination";
import { redirect } from "next/navigation";
import ErrorState from "@/components/dashboard/error-state";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;

  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    redirect("/login");
  }

  const page = Number(params.page) || 1;

  const statsRes = await userApi.getStats(authToken);
  if (statsRes.error) {
    return <ErrorState error={statsRes.error} />;
  }

  const linksRes = await userApi.getLinks(authToken, page, 10);
  if (linksRes.error) {
    return <ErrorState error={linksRes.error} />;
  }

  const stats = statsRes.data!;
  const { links, totalPages } = linksRes.data!;

  return (
    <>
      <Navbar />

      <main className="mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard title="Total Links" value={stats.totalLinks} />
          <StatCard title="Total Clicks" value={stats.totalClicks} />

          <StatCard
            title="Top Link"
            value={
              stats.topLink ? (
                <a
                  href={stats.topLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2
                    text-primary
                    hover:underline
                    break-all
                    text-xl
                    font-bold
                  "
                >
                  <span>{stats.topLink}</span>

                  <ExternalLink className="size-5 shrink-0" />
                </a>
              ) : (
                <span className="text-muted-foreground text-lg font-medium">
                  No links yet
                </span>
              )
            }
          />
        </div>
        <LongUrlInputWrapper />
        <div className="mt-16">
          <h3 className="text-lg md:text-2xl font-bold mb-6">Your Links</h3>
          <LinksTable links={links} />
        </div>
        <div className="mt-8 mb-8">
          <PaginationDashboard currentPage={page} totalPages={totalPages} />
        </div>
      </main>
    </>
  );
}
