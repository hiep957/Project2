// PDFViewer.tsx

import React from "react";
import { PDFViewer } from "@react-pdf/renderer";

import PDFLopThi from "./PDFLopThi";

const PDFViewerComponent = () => {
  return (
    <PDFViewer>
      <PDFLopThi></PDFLopThi>
    </PDFViewer>
  );
};

export default PDFViewerComponent;
