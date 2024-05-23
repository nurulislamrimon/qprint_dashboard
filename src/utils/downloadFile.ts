import { showError } from "@/helpers/showError";
import { getFromLocalStorage } from "./local-storage";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { authkey } from "@/constants/storageKey";

const handleDownloadFile = async (filePath: string) => {
  try {
    const res = await fetch(getBaseUrl() + "/download-file", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getFromLocalStorage(authkey),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filePath: filePath,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      showError(data?.message);
      return;
    }

    // Create a blob from the response
    const blob = await res.blob();

    // Create a link element
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filePath.split("/")?.pop()!; // Extract file name from the path

    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up and remove the link
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  } catch (error) {
    showError(error);
  }
};

export default handleDownloadFile;
