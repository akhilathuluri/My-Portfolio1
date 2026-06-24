import { portfolioData } from "@/lib/data";

async function getGithubContributions(username: string, token: string) {
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    query: `query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                contributionLevel
              }
            }
          }
        }
      }
    }`,
  });

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body,
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch github contributions");
  }

  return response.json();
}

const getLevelClass = (level: string) => {
  switch (level) {
    case 'NONE':
      return 'bg-muted/40';
    case 'FIRST_QUARTILE':
      return 'bg-primary/30';
    case 'SECOND_QUARTILE':
      return 'bg-primary/50';
    case 'THIRD_QUARTILE':
      return 'bg-primary/70';
    case 'FOURTH_QUARTILE':
      return 'bg-primary';
    default:
      return 'bg-muted/40';
  }
};

export default async function GithubCalendar({ token }: { token: string }) {
  const githubUrl = portfolioData.personal.socials.github;
  const username = githubUrl.split("/").filter(Boolean).pop() || "akhilathuluri";

  try {
    const data = await getGithubContributions(username, token);
    
    if (data.errors) {
      console.error("GraphQL Error:", data.errors);
      return null;
    }

    const calendar = data.data.user.contributionsCollection.contributionCalendar;
    const total = calendar.totalContributions;

    return (
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-2xl font-bold tracking-tight">Contributions</h2>
          <span className="text-muted-foreground font-mono text-sm bg-muted/30 px-3 py-1 rounded-full w-fit">
            {total} contributions in the last year
          </span>
        </div>

        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm overflow-x-auto">
          <div className="flex gap-[3px] min-w-max pb-2">
            {calendar.weeks.map((week: any, wIndex: number) => {
              const days = week.contributionDays;
              // Align the first week properly if it doesn't start on Sunday
              const paddingStart =
                wIndex === 0 ? new Date(days[0].date).getUTCDay() : 0;

              return (
                <div key={wIndex} className="flex flex-col gap-[3px]">
                  {Array.from({ length: paddingStart }).map((_, i) => (
                    <div key={`pad-${i}`} className="w-[10px] h-[10px]" />
                  ))}
                  {days.map((day: any, dIndex: number) => (
                    <div
                      key={dIndex}
                      title={`${day.contributionCount} contributions on ${day.date}`}
                      className={`w-[10px] h-[10px] rounded-[2px] transition-all duration-200 hover:ring-2 hover:ring-foreground/20 hover:z-10 cursor-crosshair ${getLevelClass(
                        day.contributionLevel
                      )}`}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.error("GithubCalendar Error:", e);
    return null;
  }
}
