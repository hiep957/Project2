
import { PDFViewer } from "@react-pdf/renderer";


import PDFLopThi from "../PDFLopThi";
// import PDFViewerComponent from "../PDFViewer";

const BieuMau = () => {
  return (
    <div className="w-4/6">
      <div>
        <div>Ngoai ra co nhieu bieu mau nua</div>
      </div>
      
     
      <div>
      <PDFViewer style={{width:"100%",height:"800px"}}>
        <PDFLopThi/>
      </PDFViewer>
      </div>

      <div>Còn 1 số thông quan trọng khác nữa</div>
      
    </div>
  );
};

export default BieuMau;
