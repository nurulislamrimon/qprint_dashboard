import pdfLogo from "@/assets/pdf_logo.png";
import pngLogo from "@/assets/png-logo.png";
import jpgLogo from "@/assets/jpg-logo.png";
import jpegLogo from "@/assets/jpeg-logo.png";
import svgLogo from "@/assets/svg-logo.png";
import psdLogo from "@/assets/psd-logo.png";

const logoMapping = {
  pdf: pdfLogo,
  png: pngLogo,
  jpg: jpgLogo,
  jpeg: jpegLogo,
  svg: svgLogo,
  psd: psdLogo,
};

export const getFileExtension = (filename: string) => {
  if (!filename) return "";
  const ext = filename?.split(".").pop();
  return ext ? ext.toLowerCase() : "";
};

export const getLogoForFile = (extension: keyof typeof logoMapping) => {
  return logoMapping[extension] || null;
};

export const getDisplayName = (fileName: string, maxLength = 20) => {
  if (
    fileName === null ||
    fileName === "undefined" ||
    fileName === "" ||
    fileName === undefined
  ) {
    return "No Attachment";
  }
  if (fileName.length > maxLength) {
    const extIndex = fileName.lastIndexOf(".");
    const extension = extIndex !== -1 ? fileName.slice(extIndex) : "";
    return `${fileName.slice(0, maxLength - 3)}...${extension}`;
  }
  return fileName;
};
