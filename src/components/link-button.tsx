import {Button} from "@/components/ui/button.tsx";
import * as React from "react";

type LinkButtonProps = {
    href: string;
} & React.ComponentProps<typeof Button>

const LinkButton = ({href, children, ...props}: LinkButtonProps) => {
    return (
        <Button variant="outline" size="sm" className="flex items-center gap-1" asChild {...props}>
            <a href={href} target="_blank" rel="noreferrer">
                {children}
            </a>
        </Button>
    )
}

export default LinkButton;