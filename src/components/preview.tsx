import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import 'highlight.js/styles/atom-one-dark.css'
import {ScrollArea} from "@/components/ui/scroll-area";
import {cn} from "@/lib/utils.ts";

const Preview = ({markdown, isTarget}: { markdown: string, isTarget?: true }) => {

    return (
        <ScrollArea
            className={cn("markdown-preview min-h-[500px] max-h-[900px] rounded-md p-4 prose dark:prose-invert max-w-none", {border: !isTarget})}
            childrenProps={{className: "markdown-inner", ...(isTarget ? {id: "target"} : {})}}>
            <div>
                <ReactMarkdown
                    rehypePlugins={[rehypeHighlight]}
                    remarkPlugins={[remarkGfm]}
                >
                    {markdown}
                </ReactMarkdown>
            </div>
        </ScrollArea>
    )
}

export default Preview;