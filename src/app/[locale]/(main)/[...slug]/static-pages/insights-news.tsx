import PagePostsSection from "./_components/page-posts-section";

export default function Page({ slug }: { slug: string[] }) { return (
    <div className="bg-background text-foreground">
      <PagePostsSection slug={slug} />
    </div>
  ); }
