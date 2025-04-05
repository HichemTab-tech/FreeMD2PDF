import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Download, Coffee, LoaderCircle, Code} from "lucide-react";
import {SiGithub as Github} from "@icons-pack/react-simple-icons";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SupportGithub from "@/components/SupportGithub.tsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {useState} from "react";
import defaultMarkdown from "@/defaultMarkdown.ts";
import Preview from "@/components/preview.tsx";
import Editor from "@/components/editor.tsx";
import {downloadMarkdownAsPDF} from "@/lib/utils.ts";
import {toast} from "sonner"
import './App.css'
import LinkButton from "@/components/link-button.tsx";

export default function App() {
    const [showDialog, setShowDialog] = useState(false)
    const [markdown, setMarkdown] = useState(defaultMarkdown)
    const [loading, setLoading] = useState(false)
    const [tabValue, setTabValue] = useState<"editor" | "preview">("editor")

    const handleDownload = () => {
        setLoading(true)
        setTimeout(() => {
            downloadMarkdownAsPDF().then(
                () => {
                    setLoading(false)
                    setShowDialog(true)
                }
            ).catch(
                (error) => {
                    console.error("Error downloading PDF:", error)
                    toast.error("Error downloading PDF. Please try again.")
                    setLoading(false)
                }
            )
        }, 1000);
    }
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header/>

            <main className="flex-1 container mx-auto py-6 px-2 md:px-4">
                {/* Mobile View: Tabs (Editor and Preview) */}
                <div className="block lg:hidden">
                    <Tabs value={tabValue} onValueChange={(v) => setTabValue(v as "editor" | "preview")}
                          className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="editor">Editor</TabsTrigger>
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                        </TabsList>

                        <div className="flex items-center justify-between mt-4">
                            <LinkButton href="https://www.buymeacoffee.com/HichemTabTech">
                                <Coffee className="h-4 w-4"/>
                                <span>Support</span>
                            </LinkButton>
                            <SupportGithub/>
                        </div>

                        {/* Editor */}
                        <TabsContent value="editor" className="mt-1">
                            <Editor
                                value={markdown}
                                setMarkdown={setMarkdown}
                            />
                        </TabsContent>

                        {/* Preview */}
                        <TabsContent value="preview" className="mt-1 space-y-4">
                            <div className="grid">
                                <Preview markdown={markdown}/>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Desktop View: Always show Preview */}
                <div className="hidden lg:block space-y-4">
                    <div className="flex items-center justify-between mt-4">
                        <LinkButton href="https://www.buymeacoffee.com/HichemTabTech">
                            <Coffee className="h-4 w-4"/>
                            <span>Support</span>
                        </LinkButton>
                        <SupportGithub/>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Editor
                            value={markdown}
                            setMarkdown={setMarkdown}
                        />

                        <Preview markdown={markdown}/>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-5">
                    <LinkButton href="https://github.com/HichemTab-tech/FreeMD2PDF">
                        <Code className="mr-2 h-5 w-5"/>
                        View Code Source
                    </LinkButton>

                    <Button onClick={handleDownload} className="flex items-center gap-1" disabled={loading}>
                        {loading ? <LoaderCircle className="h-4 w-4 animate-spin"/> : <Download className="h-4 w-4"/>}
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
                                        <Coffee className="h-12 w-12 text-amber-500"/>
                                    </div>
                                </div>
                                <p className="text-center">Your support helps keep this tool free and continuously
                                    improving!</p>
                                <div className="flex flex-col space-y-3">
                                    <LinkButton size="lg" className="bg-amber-500 hover:bg-amber-600 text-white hover:text-white" href="https://www.buymeacoffee.com/HichemTabTech">
                                        <Coffee className="mr-2 h-5 w-5"/>
                                        Buy me a coffee
                                    </LinkButton>
                                    <LinkButton size="lg" className="bg-teal-600 hover:bg-teal-700 text-white hover:text-white" href="https://github.com/HichemTab-tech">
                                        <Github className="mr-2 h-5 w-5"/>
                                        Or follow me on Github
                                    </LinkButton>
                                    <Button variant="outline" onClick={() => setShowDialog(false)}>
                                        Maybe next time
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </main>
            <div className="target-overlay">
                <div className="flex items-center justify-center">
                    <Preview markdown={markdown} isTarget={true}/>
                </div>
            </div>

            <Footer/>
        </div>
    );
}