// src/components/preview.tsx
import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/atom-one-dark.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils.ts";
import { type Margins, type MarginUnit, toPx } from "@/lib/utils.ts";

const Preview = ({
  markdown,
  isTarget,
  margins,
  unit,
}: {
  markdown: string;
  isTarget?: true;
  margins?: Margins;
  unit?: MarginUnit;
}) => {
  // compute CSS padding in px from margins + unit
  const style: React.CSSProperties | undefined =
    margins && unit
      ? {
          paddingTop: toPx(margins.top, unit),
          paddingRight: toPx(margins.right, unit),
          paddingBottom: toPx(margins.bottom, unit),
          paddingLeft: toPx(margins.left, unit),
        }
      : undefined;

  return (
    <ScrollArea
      className={cn(
        "markdown-preview min-h-[500px] max-h-[900px] rounded-md p-4 prose dark:prose-invert max-w-none",
        { border: !isTarget }
      )}
      childrenProps={{
        className: "markdown-inner",
        ...(isTarget ? { id: "target" } : {}),
        style, // apply live padding
      }}
    >
      <div>
        <ReactMarkdown
          rehypePlugins={[rehypeHighlight]}
          remarkPlugins={[remarkGfm]}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </ScrollArea>
  );
};

export default Preview;
