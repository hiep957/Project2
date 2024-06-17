// PDFViewer.tsx

// import React from "react";
import { PDFViewer } from "@react-pdf/renderer";

import PDFLopThi from "./PDFLopThi";
import PDFDocument from "./PDFDocument";

const PDFViewerComponent = () => {
  return (
    <PDFViewer>
      <PDFDocument></PDFDocument>
    </PDFViewer>
  );
};

export default PDFViewerComponent;
