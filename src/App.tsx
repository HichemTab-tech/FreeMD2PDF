// src/App.tsx
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Coffee, LoaderCircle, Code, RotateCcw } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SupportGithub from "@/components/SupportGithub.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { useState } from "react";
import defaultMarkdown from "@/defaultMarkdown.ts";
import Preview from "@/components/preview.tsx";
import Editor from "@/components/editor.tsx";
import {
  downloadMarkdownAsPDF,
  type Margins,
  type MarginUnit,
} from "@/lib/utils.ts";
import { toast } from "sonner";
import "./App.css";
import LinkButton from "@/components/link-button.tsx";

export default function App() {
  // Show “Thanks” dialog after download
  const [showDialog, setShowDialog] = useState(false);

  // Editor content
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  // Download button spinner
  const [loading, setLoading] = useState(false);

  // Mobile tabs (Editor / Preview)
  const [tabValue, setTabValue] = useState<"editor" | "preview">("editor");

  // >>> NEW: Margin controls raw string state
  const [rawMargins, setRawMargins] = useState({
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
  });

  // Convert raw string margins to numbers for actual use
  const margins: Margins = {
    top: Number(rawMargins.top) || 0,
    right: Number(rawMargins.right) || 0,
    bottom: Number(rawMargins.bottom) || 0,
    left: Number(rawMargins.left) || 0,
  };

  const [unit, setUnit] = useState<MarginUnit>("mm");

  // Handle input changes allowing only digits or empty string
  const handleMarginChange =
    (side: keyof typeof rawMargins) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (/^\d*$/.test(val)) {
        setRawMargins((m) => ({ ...m, [side]: val }));
      }
    };

  // Reset margins to default "0"
  const resetMargins = () =>
    setRawMargins({ top: "0", right: "0", bottom: "0", left: "0" });

  const handleDownload = () => {
    setLoading(true);
    // Small delay to let the hidden preview settle (kept from original code)
    setTimeout(() => {
      downloadMarkdownAsPDF({ margins, unit })
        .then(() => {
          setLoading(false);
          setShowDialog(true);
        })
        .catch((error) => {
          console.error("Error downloading PDF:", error);
          toast.error(
            error?.message ??
              "Error downloading PDF. Please check margins and try again."
          );
          setLoading(false);
        });
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto py-6 px-2 md:px-4">
        {/* Mobile View: Tabs (Editor and Preview) */}
        <div className="block lg:hidden">
          <Tabs
            value={tabValue}
            onValueChange={(v) => setTabValue(v as "editor" | "preview")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <div className="flex items-center justify-between mt-4">
              <LinkButton href="https://www.buymeacoffee.com/HichemTabTech">
                <Coffee className="h-4 w-4" />
                <span>Support</span>
              </LinkButton>
              <SupportGithub />
            </div>

            {/* Editor */}
            <TabsContent value="editor" className="mt-1">
              <Editor value={markdown} setMarkdown={setMarkdown} />
            </TabsContent>

            {/* Preview */}
            <TabsContent value="preview" className="mt-1 space-y-4">
              <div className="grid">
                <Preview markdown={markdown} margins={margins} unit={unit} />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop View: Always show Preview */}
        <div className="hidden lg:block space-y-4">
          <div className="flex items-center justify-between mt-4">
            <LinkButton href="https://www.buymeacoffee.com/HichemTabTech">
              <Coffee className="h-4 w-4" />
              <span>Support</span>
            </LinkButton>
            <SupportGithub />
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <Editor value={markdown} setMarkdown={setMarkdown} />
            <Preview markdown={markdown} margins={margins} unit={unit} />
          </div>
        </div>

        {/* >>> NEW: PDF Margins Panel */}
        <section className="mt-6 rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-3">PDF Margins</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-sm">Top</span>
              <input
                type="text"
                inputMode="numeric"
                value={rawMargins.top}
                onChange={handleMarginChange("top")}
                className="border rounded-md px-2 py-1"
                placeholder="0"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm">Right</span>
              <input
                type="text"
                inputMode="numeric"
                value={rawMargins.right}
                onChange={handleMarginChange("right")}
                className="border rounded-md px-2 py-1"
                placeholder="0"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm">Bottom</span>
              <input
                type="text"
                inputMode="numeric"
                value={rawMargins.bottom}
                onChange={handleMarginChange("bottom")}
                className="border rounded-md px-2 py-1"
                placeholder="0"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm">Left</span>
              <input
                type="text"
                inputMode="numeric"
                value={rawMargins.left}
                onChange={handleMarginChange("left")}
                className="border rounded-md px-2 py-1"
                placeholder="0"
              />
            </label>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <label className="flex items-center gap-2">
              <span className="text-sm">Units</span>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as MarginUnit)}
                className="border rounded-md px-2 py-1"
              >
                <option value="mm">mm (recommended)</option>
                <option value="px">px (96 px = 25.4 mm)</option>
                <option value="pt">pt (72 pt = 25.4 mm)</option>
              </select>
            </label>

            <Button variant="outline" size="sm" onClick={resetMargins}>
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </section>

        {/* Bottom bar with code link + Download */}
        <div className="flex justify-between items-center mt-5">
          <LinkButton href="https://github.com/HichemTab-tech/FreeMD2PDF">
            <Code className="mr-2 h-5 w-5" />
            View Code Source
          </LinkButton>

          <Button
            onClick={handleDownload}
            className="flex items-center gap-1"
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            <span>Download PDF</span>
          </Button>

          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Your download is ready! 🎉
                </DialogTitle>
                <DialogDescription>
                  Thanks for using our editor. If you find it useful, consider
                  supporting the project.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="animate-bounce bg-amber-100 dark:bg-amber-900 p-6 rounded-full">
                    <Coffee className="h-12 w-12 text-amber-500" />
                  </div>
                </div>
                <p className="text-center">
                  Your support helps keep this tool free and continuously
                  improving!
                </p>
                <div className="flex flex-col space-y-3">
                  <LinkButton
                    size="lg"
                    className="bg-amber-500 hover:bg-amber-600 text-white hover:text-white"
                    href="https://www.buymeacoffee.com/HichemTabTech"
                  >
                    <Coffee className="mr-2 h-5 w-5" />
                    Buy me a coffee
                  </LinkButton>
                  <LinkButton
                    size="lg"
                    className="bg-teal-600 hover:bg-teal-700 text-white hover:text-white"
                    href="https://github.com/HichemTab-tech"
                  >
                    View my GitHub
                  </LinkButton>
                  <Button
                    variant="outline"
                    onClick={() => setShowDialog(false)}
                  >
                    Maybe next time
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>

      {/* Hidden overlay we snapshot for the PDF (unchanged) */}
      <div className="target-overlay">
        <div className="flex items-center justify-center">
          <Preview
            markdown={markdown}
            isTarget={true}
            margins={margins}
            unit={unit}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
