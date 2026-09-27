import PagePostsGrouped from "./_components/page-posts-grouped";

const CHILD_PATHS = ["/ai-automation", "/insights-digital-transformation", "/enterprise-tech", "/insights-software-engineering", "/insights-industry", "/reports", "/news"];

export default function InsightsPage({ slug }: { slug: string[] }) { return (
    <div className="bg-background text-foreground">
      <PagePostsGrouped slug={slug} childPaths={CHILD_PATHS} />
    </div>
  ); }
