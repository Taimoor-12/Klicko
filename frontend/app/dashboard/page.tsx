import { Navbar } from "@/components/dashboard/navbar";
import { ExternalLink } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { userApi } from "@/lib/api";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    throw new Error("Unauthorized");
  }

  const res = await userApi.getStats(authToken);

  const stats = res.data;

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
      </main>
    </>
  );
}
