import * as React from "react";
import {Textarea} from "@/components/ui/textarea.tsx";

const Editor = ({value, setMarkdown}: {
    value: string;
    setMarkdown: (value: React.SetStateAction<string>) => void
}) => {

    return (
        <Textarea
            className="min-h-[500px] max-h-[900px] w-full p-4 font-mono"
            placeholder="Start typing your content here..."
            value={value}
            onChange={(e) => setMarkdown(e.target.value)}
        />
    )
}

export default Editor;