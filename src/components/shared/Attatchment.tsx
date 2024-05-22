import { IconDownload } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { useDownloadPrintingRequesFileMutation } from "@/store/features/printingRequest/printingRequestApi";
import { showError } from "@/helpers/showError";
import {
  getDisplayName,
  getFileExtension,
  getLogoForFile,
} from "@/utils/pdfFileShorter";

const Attatchment = ({ filePath }: { filePath: string }) => {
  console.log(filePath);
  const [downloadPrintingRequest] = useDownloadPrintingRequesFileMutation();

  const handleFile = async () => {
    try {
      const res = await downloadPrintingRequest(filePath);
      console.log(res);
    } catch (error) {
      showError(error);
    }
  };

  const extension = getFileExtension(filePath) as
    | "pdf"
    | "png"
    | "jpg"
    | "jpeg"
    | "svg"
    | "psd";
  const logoSrc = getLogoForFile(extension);
  return (
    <div className="p-5 flex flex-col gap-2.5">
      <span className="main-text-color text-base">Attachment</span>
      <div
        className={`flex items-center gap-5 border px-5 py-2.5 rounded-custom-10px md:w-2/4 w-full cursor-pointer ${
          filePath === null || undefined || ("" && `cursor-not-allowed`)
        }`}
        onClick={handleFile}
      >
        {logoSrc && (
          <div className="w-5 h-5 shrink-0">
            <Image src={logoSrc} alt={`${extension}-logo`} />
          </div>
        )}
        <div className="text-base text-black-opacity-70">
          {getDisplayName(filePath)}
        </div>
        <IconDownload stroke={1} width={20} height={20} />
      </div>
    </div>
  );
};

export default Attatchment;
