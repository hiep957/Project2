
import { PDFViewer } from "@react-pdf/renderer";


import PDFLopThi from "../PDFLopThi";
import PDFDocument from "../PDFDocument";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
// import PDFViewerComponent from "../PDFViewer";

const BieuMau = () => {
  const authContext = useContext(AuthContext);
  
  const getData = async()=> {
    if(!authContext) {
      return;
    }
    const {accessToken} = authContext;
    const response = await fetch("https://19df-42-113-220-219.ngrok-free.app/api/v1/student/rpt-lop-thi", {
      method:"GET",
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
  useEffect(() => {
    getData().then((data) => console.log(data));
  },[])
  return (
    <div className="w-4/6">
      <div>
        <div>Ngoai ra co nhieu bieu mau nua</div>
      </div>
      
     
      <div>
      <PDFViewer style={{width:"100%",height:"800px"}}>
        <PDFDocument/>
      </PDFViewer>
      </div>

      <div>Còn 1 số thông quan trọng khác nữa</div>
      
    </div>
  );
};

export default BieuMau;
