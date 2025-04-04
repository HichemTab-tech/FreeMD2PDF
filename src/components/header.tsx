import { Button } from "@/components/ui/button"

export default function Header() {
    return (
        <header className="border-b">
            <div className="container mx-auto py-4 px-4 md:px-6">
                <div className="flex items-center justify-between">
                    <a href="/" className="text-2xl font-bold">
                        TextEditor
                    </a>
                    <nav className="hidden md:flex items-center space-x-4">
                        <a href="#" className="text-sm font-medium hover:underline">
                            Features
                        </a>
                        <a href="#" className="text-sm font-medium hover:underline">
                            Docs
                        </a>
                        <a href="#" className="text-sm font-medium hover:underline">
                            Pricing
                        </a>
                        <a href="#" className="text-sm font-medium hover:underline">
                            Blog
                        </a>
                    </nav>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            Sign In
                        </Button>
                        <Button size="sm">Sign Up</Button>
                    </div>
                </div>
            </div>
        </header>
    )
}