import {SiGithub as Github, SiX as Twitter} from '@icons-pack/react-simple-icons';
import {Separator} from "@/components/ui/separator.tsx";

export default function Footer() {
    return (
        <footer className="border-t">
            <div className="container mx-auto py-6 px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <a href="/" className="flex items-center mb-3">
                            <img
                                src="/logo.png"
                                alt="FreeMD2PDF Logo"
                                className="h-8 w-auto"/>
                            <div className="h-8 mx-2">
                                <Separator orientation="vertical"/>
                            </div>

                            <h3 className="text-lg font-semibold mb-0">FreeMD2PDF</h3>
                        </a>
                        <p className="text-sm text-muted-foreground">
                            A simple and efficient tool to convert your Markdown files into PDF documents.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Other projects</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://github.com/HichemTab-tech/RubiksCube-threejs" className="text-sm hover:underline">
                                    Rubik's Cube game
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/HichemTab-tech/LaravelFS" className="text-sm hover:underline">
                                    LaravelFS
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/HichemTab-tech/ts-runtime-picker" className="text-sm hover:underline">
                                    ts-runtime-picker
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Social</h3>
                        <div className="flex space-x-4">
                            <a href="https://github.com/HichemTab-tech" className="hover:text-primary">
                                <Github className="h-5 w-5"/>
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a href="https://x.com/hichemtab1" className="hover:text-primary">
                                <Twitter className="h-5 w-5"/>
                                <span className="sr-only">Twitter</span>
                            </a>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-muted-foreground">
                                © {new Date().getFullYear()} FreeMD2PDF. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}