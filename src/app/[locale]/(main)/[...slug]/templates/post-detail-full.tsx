import { cn } from "@/lib/utils";
import type { MockPost } from "@/mockdata/posts";

/**
 * Content-only news-post template — renders just the article body
 * (no title, excerpt, header, image or CTA).
 */
export default function PostDetailFullPage({ post,
  locale }: {
    post: MockPost;
    locale: string;
  }) {
  const isVi = locale === "vi";

  return (
    <div className="container pb-16 pt-20 sm:pt-30">
      <article className="mx-auto max-w-[1320px]">
        {post.sections.map((section, index) => (
          <section
            key={section.heading || section.body.slice(0, 40)}
            className={cn(index > 0 && "mt-12 border-t border-border pt-12")}
          >
            {section.heading ? (
              <h2 className="text-[21px] font-semibold leading-[1.3] tracking-[-0.01em] text-foreground sm:text-[23px]">
                {isVi ? section.heading : section.headingEn}
              </h2>
            ) : null}
            <div
              className={cn(
                "text-[16px] leading-[1.85] text-muted-foreground",
                "[&>p]:mb-5 [&_strong]:font-semibold [&_strong]:text-foreground",
                "[&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-[17px] [&_h3]:font-semibold [&_h3]:text-foreground",
                "[&_h4]:mb-2 [&_h4]:mt-6 [&_h4]:text-[15.5px] [&_h4]:font-semibold [&_h4]:text-foreground",
                "[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
                "[&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5",
                "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
                "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-5 [&_blockquote]:text-foreground/80",
                section.heading ? "mt-4" : "",
              )}
              dangerouslySetInnerHTML={{ __html: isVi ? section.body : section.bodyEn }}
            />
          </section>
        ))}
      </article>
    </div>
  );
}
