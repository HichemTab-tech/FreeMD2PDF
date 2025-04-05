import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator.tsx";
import {Moon, Sun} from "lucide-react";
import useTheme from "@/hooks/use-theme.ts";

export default function Header() {
    const { theme, setTheme } = useTheme()
    return (
        <header className="border-b">
            <div className="container mx-auto py-4 px-4 md:px-6">
                <div className="flex items-center justify-between">
                    <a href="/" className="text-2xl font-bold flex items-center">
                        <img
                            src="/logo.png"
                            alt="FreeMD2PDF Logo"
                            className="h-12 w-auto"/>
                        <div className="h-8 mx-2">
                            <Separator orientation="vertical"/>
                        </div>

                        FreeMD2PDF
                    </a>
                    {/*<nav className="hidden md:flex items-center space-x-4">
                        <a href="#" className="text-sm font-medium hover:underline">
                            Docs
                        </a>
                        <a href="#" className="text-sm font-medium hover:underline">
                            Pricing
                        </a>
                    </nav>*/}
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="relative overflow-hidden"
                            aria-label="Toggle theme"
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}