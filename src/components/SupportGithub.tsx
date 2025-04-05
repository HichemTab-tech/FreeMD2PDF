import {SiGithub as Github} from "@icons-pack/react-simple-icons";
import {Heart} from "lucide-react";
import LinkButton from "@/components/link-button.tsx";

const SupportGithub = () => {
    return (
        <div className="flex items-center space-x-2">
            <LinkButton href="https://github.com/HichemTab-tech/FreeMD2PDF">
                <Github className="h-4 w-4"/>
                <span>Star</span>
            </LinkButton>
            <LinkButton href="https://github.com/HichemTab-tech">
                <Heart className="h-4 w-4"/>
                <span>Follow</span>
            </LinkButton>
        </div>
    )
}

export default SupportGithub;