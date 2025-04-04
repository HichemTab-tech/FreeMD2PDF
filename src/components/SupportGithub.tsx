import {Button} from "@/components/ui/button.tsx";
import {SiGithub as Github} from "@icons-pack/react-simple-icons";
import {Heart} from "lucide-react";

const SupportGithub = () => {
    return (
        <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                <span>Star</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>Follow</span>
            </Button>
        </div>
    )
}

export default SupportGithub;