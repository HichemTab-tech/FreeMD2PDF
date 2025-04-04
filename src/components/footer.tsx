import {SiGithub as Github, SiX as Twitter} from '@icons-pack/react-simple-icons';

export default function Footer() {
    return (
        <footer className="border-t">
            <div className="container mx-auto py-6 px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">TextEditor</h3>
                        <p className="text-sm text-muted-foreground">A simple text editor with preview functionality.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm hover:underline">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:underline">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:underline">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:underline">
                                    Pricing
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Social</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-primary">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a href="#" className="hover:text-primary">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </a>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-muted-foreground">
                                © {new Date().getFullYear()} TextEditor. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}