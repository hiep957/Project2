import { PDFViewer } from "@react-pdf/renderer";
import PDFDocument from "../PDFDocument";
import PDFViewerComponent from "../PDFViewer";

const BieuMau = () => {
  return (
    <div className="h-[32rem] p-2 bg-slate-400">
      <PDFViewerComponent/>
    </div>
  );
};

export default BieuMau;
