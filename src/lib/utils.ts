import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import jsPDF from "jspdf"
import html2canvas from "html2canvas-pro";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export async function downloadMarkdownAsPDF() {
    const preview = document.getElementById('target') as HTMLElement;

    const canvas = await html2canvas(preview, {scale: 2, useCORS: true});

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const padding = 15;
    const usableHeight = pdfHeight - 2 * padding;

    const imgWidthPx = canvas.width;
    const imgHeightPx = canvas.height;

    const pxToMmRatio = pdfWidth / imgWidthPx;

    const canvasUsableHeightPx = usableHeight / pxToMmRatio;

    let renderedHeightPx = 0;

    while (renderedHeightPx < imgHeightPx) {
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = imgWidthPx;

        const remainingPxHeight = imgHeightPx - renderedHeightPx;
        pageCanvas.height = remainingPxHeight > canvasUsableHeightPx ? canvasUsableHeightPx : remainingPxHeight;

        const ctx = pageCanvas.getContext('2d')!;

        // Draw the slice onto the temporary canvas
        ctx.drawImage(canvas,
            0, renderedHeightPx, imgWidthPx, pageCanvas.height,
            0, 0, imgWidthPx, pageCanvas.height
        );

        // Add the sliced canvas image to the PDF document
        const slicedImgData = pageCanvas.toDataURL('image/png');

        if (renderedHeightPx !== 0) {
            pdf.addPage();
        }

        const slicedImageHeightMm = pageCanvas.height * pxToMmRatio;

        pdf.addImage(
            slicedImgData,
            "PNG",
            0,
            padding,
            pdfWidth,
            slicedImageHeightMm
        );

        renderedHeightPx += pageCanvas.height;
    }

    pdf.save("FreeMD2PDF.pdf");
}
