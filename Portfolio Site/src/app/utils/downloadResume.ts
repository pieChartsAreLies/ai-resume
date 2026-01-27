import { jsPDF } from 'jspdf';
import imgSgResume20261 from "figma:asset/2e23e526f99f02e650d476e1bae403557646f141.png";

export const downloadResumeAsPdf = async () => {
  try {
    const img = new Image();
    
    // Create a promise to handle image loading
    const loadImage = new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load resume image'));
      img.src = imgSgResume20261;
    });

    await loadImage;

    // Get original image dimensions
    const imgWidth = img.width;
    const imgHeight = img.height;
    
    // Create PDF with custom size matching the image aspect ratio
    // We use points (pt). 1 pixel is roughly 0.75 points at 96 DPI, 
    // but the exact unit doesn't matter as much as the ratio.
    const orientation = imgWidth > imgHeight ? 'l' : 'p';
    const pdf = new jsPDF(orientation, 'pt', [imgWidth, imgHeight]);

    // Add image at 0,0 with its own dimensions
    pdf.addImage(img, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('Scott_Gerstl_Resume.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback: just open the image in a new tab if PDF fails
    window.open(imgSgResume20261, '_blank');
  }
};
