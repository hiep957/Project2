import { PDFViewer } from "@react-pdf/renderer";

import PDFLopThi from "../PDFLopThi";
import PDFDocument from "../PDFDocument";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import GeneratePDF from "../component/PDF";
import PDFTest from "../PDFTest";
// import PDFViewerComponent from "../PDFViewer";

interface Child {
  room: string;
  examClassId: string;
  name: string;
  courseId: string;
  time: string;
  instructorName: string;
  totalStudent: string;
  orderInfo: string;
}

interface ExamClass {
  examClassId: string;
  child: Child[];
}

interface ExamData {
  name: string;
  list: ExamClass[];
}

const BieuMau = () => {
  const authContext = useContext(AuthContext);
  const [examData, setExamData] = useState<ExamData | undefined>();
  const [valueInput,setvalueInput] = useState<string>("")
  const getData = async (data: string) => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      `https://19df-42-113-220-219.ngrok-free.app/api/v1/student/rpt-lop-thi?courseIds=${data}&semester=2023.1`,
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  // useEffect(() => {
  //   getData().then((data: ExamData) => {
  //     setExamData(data), console.log(examData);
  //   });
  // }, []);
  const handleSubmit = async(e: React.FormEvent) =>{
    e.preventDefault();
    await getData(valueInput).then((data: ExamData) => {
      setExamData(data)
    });
    console.log(valueInput)

  }
  return (
    <div className="w-4/6 ">
      

      <div className="text-xl">Nhập mã học phần bạn muốn xem phòng thi</div>
      <label htmlFor="">
        Mời nhập mã học phần
        <input type="text" className="bg-slate-200 rounded ml-2 p-2" onChange={e=>setvalueInput(e.target.value)} />
      </label>
      <button className="ml-2 p-2 w-20 rounded bg-slate-200" onClick={handleSubmit}>
        Gửi
      </button>
      <div className="mt-5">
        <PDFViewer style={{ width: "100%", height: "800px" }}>
          {examData && <PDFTest abc={examData} input={valueInput} />}
        </PDFViewer>
      </div>
    </div>
  );
};

export default BieuMau;
