import PrintingMode from "@/components/ShopSetup/RequestPrintingPage/PrintingMode";
import PrintingPaperSize from "@/components/ShopSetup/RequestPrintingPage/PrintingPaperSize";
import PrintingPaperType from "@/components/ShopSetup/RequestPrintingPage/PrintingPaperType";
import React from "react";

const RequestPrintingSetup = () => {
  return (
    <div className="p-5 md:p-7">
      <PrintingPaperSize />
      <PrintingPaperType />
      <PrintingMode />
    </div>
  );
};

export default RequestPrintingSetup;
