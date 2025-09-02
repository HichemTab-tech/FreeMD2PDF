// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

/**
 * Utility for merging Tailwind class names (unchanged).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Units the user can pick in the UI.
 * - "mm"  : millimeters (native unit for jsPDF)
 * - "px"  : CSS pixels (assume 96 dpi => 1 in = 96 px)
 * - "pt"  : points (1 in = 72 pt)
 */
export type MarginUnit = "mm" | "px" | "pt";

/** Four-side margins */
export type Margins = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

/** Convert px or pt to millimeters, or pass mm through unchanged. */
function toMm(value: number, unit: MarginUnit): number {
  if (unit === "mm") return value;
  const INCH_TO_MM = 25.4;
  if (unit === "px") {
    // 1in = 96px in CSS pixel world
    return (value * INCH_TO_MM) / 96;
  }
  // unit === "pt"
  return (value * INCH_TO_MM) / 72;
}

/**
 * Convert mm / px / pt into CSS pixels for on-screen preview
 */
export function toPx(value: number, unit: MarginUnit): number {
  if (unit === "px") return value;
  if (unit === "mm") {
    return (value * 96) / 25.4; // 96 px per inch, 25.4 mm per inch
  }
  // unit === "pt"
  return (value * 96) / 72; // 72 pt per inch
}

/**
 * Generate the PDF from the hidden #target element, honoring custom margins.
 * - margins: values in the chosen unit (mm/px/pt)
 * - unit   : which unit margins are written in
 */
export async function downloadMarkdownAsPDF({
  margins,
  unit,
}: {
  margins: Margins;
  unit: MarginUnit;
}) {
  // 1) Find the hidden preview that we snapshot into the PDF.
  const preview = document.getElementById("target") as HTMLElement;
  if (!preview) {
    throw new Error(
      "Could not find preview area with id='target'. Is the hidden overlay mounted?"
    );
  }

  // 2) Rasterize the DOM into a canvas (scale 2 = sharper).
  const canvas = await html2canvas(preview, { scale: 2, useCORS: true });

  // 3) Prepare the PDF in millimeters on A4.
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // 4) Convert user margins to millimeters and validate.
  const leftMm = Math.max(0, toMm(margins.left, unit));
  const rightMm = Math.max(0, toMm(margins.right, unit));
  const topMm = Math.max(0, toMm(margins.top, unit));
  const bottomMm = Math.max(0, toMm(margins.bottom, unit));

  const usableWidth = pdfWidth - leftMm - rightMm;
  const usableHeight = pdfHeight - topMm - bottomMm;

  if (usableWidth <= 0 || usableHeight <= 0) {
    throw new Error(
      "Margins are too large for the page size. Reduce margins and try again."
    );
  }

  // 5) Canvas size in pixels (html2canvas outputs pixels).
  const imgWidthPx = canvas.width;
  const imgHeightPx = canvas.height;

  // 6) How many millimeters one pixel corresponds to when we scale to usableWidth.
  const pxToMmRatio = usableWidth / imgWidthPx;

  // 7) How tall, in pixels, each PDF page's usable area can hold.
  const canvasUsableHeightPx = usableHeight / pxToMmRatio;

  // 8) Walk down the big canvas, slicing it into page-sized stripes.
  let renderedHeightPx = 0;

  while (renderedHeightPx < imgHeightPx) {
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = imgWidthPx;

    // Height of the current slice in pixels.
    const remainingPxHeight = imgHeightPx - renderedHeightPx;
    pageCanvas.height =
      remainingPxHeight > canvasUsableHeightPx
        ? canvasUsableHeightPx
        : remainingPxHeight;

    const ctx = pageCanvas.getContext("2d")!;
    // Copy a slice from the big canvas into this temp canvas.
    ctx.drawImage(
      canvas,
      0, // src x
      renderedHeightPx, // src y
      imgWidthPx, // src w
      pageCanvas.height, // src h
      0, // dst x
      0, // dst y
      imgWidthPx, // dst w
      pageCanvas.height // dst h
    );

    // Turn the slice into an image for jsPDF.
    const slicedImgData = pageCanvas.toDataURL("image/png");

    if (renderedHeightPx !== 0) {
      pdf.addPage();
    }

    // Height of the slice in mm when scaled to the usable width.
    const slicedImageHeightMm = pageCanvas.height * pxToMmRatio;

    // Place the image inside the margins:
    //  - x starts at the left margin
    //  - y starts at the top margin
    //  - width fills the usableWidth
    //  - height scales to keep aspect ratio
    pdf.addImage(
      slicedImgData,
      "PNG",
      leftMm /* x */,
      topMm /* y */,
      usableWidth /* width */,
      slicedImageHeightMm /* height */
    );

    renderedHeightPx += pageCanvas.height;
  }

  pdf.save("FreeMD2PDF.pdf");
}
