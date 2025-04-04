import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Download, Coffee} from "lucide-react";
import {SiGithub as Github} from "@icons-pack/react-simple-icons";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SupportGithub from "@/components/SupportGithub.tsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {useState} from "react";

export default function App() {
    const [showDialog, setShowDialog] = useState(false)

    const handleDownload = () => {
        // Here you would implement the actual PDF download logic
        // For now, we'll just show the dialog
        setShowDialog(true)
    }
    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
                {/* Mobile View: Tabs (Editor and Preview) */}
                <div className="block lg:hidden">
                    <Tabs defaultValue="editor" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="editor">Editor</TabsTrigger>
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                        </TabsList>

                        {/* Editor */}
                        <TabsContent value="editor" className="mt-4">
                            <Textarea
                                className="min-h-[500px] w-full p-4 font-mono"
                                placeholder="Start typing your content here..."
                            />
                        </TabsContent>

                        {/* Preview */}
                        <TabsContent value="preview" className="mt-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Preview</h2>
                                <SupportGithub/>
                            </div>
                            <div className="min-h-[500px] border rounded-md p-4 prose dark:prose-invert max-w-none">
                                <p>Your content will appear here...</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Desktop View: Always show Preview */}
                <div className="hidden lg:block space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Preview</h2>
                        <SupportGithub/>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Textarea
                            className="min-h-[500px] w-full p-4 font-mono"
                            placeholder="Start typing your content here..."
                        />

                        <div className="min-h-[500px] border rounded-md p-4 font-mono text-sm overflow-auto">
                            <pre>&lt;p&gt;Your content will appear here...&lt;/p&gt;</pre>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-5">
                    <Button variant="outline" className="flex items-center gap-1">
                        <Coffee className="h-4 w-4" />
                        <span>Support</span>
                    </Button>

                    <Button onClick={handleDownload} className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>Download PDF</span>
                    </Button>

                    <Dialog open={showDialog} onOpenChange={setShowDialog}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-2xl">Your download is ready! 🎉</DialogTitle>
                                <DialogDescription>
                                    Thanks for using our editor. If you find it useful, consider supporting the project.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                                <div className="flex justify-center">
                                    <div className="animate-bounce bg-amber-100 dark:bg-amber-900 p-6 rounded-full">
                                        <Coffee className="h-12 w-12 text-amber-500" />
                                    </div>
                                </div>
                                <p className="text-center">Your support helps keep this tool free and continuously improving!</p>
                                <div className="flex flex-col space-y-3">
                                    <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                                        <Coffee className="mr-2 h-5 w-5" />
                                        Buy me a coffee
                                    </Button>
                                    <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                                        <Github className="mr-2 h-5 w-5" />
                                        Or follow me on Github
                                    </Button>
                                    <Button variant="outline" onClick={() => setShowDialog(false)}>
                                        Maybe next time
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </main>

            <Footer />
        </div>
    );
}