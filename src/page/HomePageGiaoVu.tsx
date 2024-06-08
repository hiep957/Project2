import { useState } from "react";
import EventSoict from "../component/EventSoict";
import Tab from "../component/Tab";
import PDFViewerComponent from "../PDFViewer";
import Xeplich from "./Xeplich";
import HocPhan from "./HocPhan";
import BieuMau from "./BieuMau";

interface Props {
  children: React.ReactNode;
}
const tabData = [
  { id: 1, content: "Xếp lịch" },
  { id: 2, content: "Cài đặt thời gian" },
  { id: 3, content: "Học phần" },
  { id: 4, content: "Biểu mẫu" },
];
const HomePageGiaoVu = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="flex ">
      <div className="flex flex-col items-center ml-3 ">
        <ul className=" space-y-3  ">
          {tabData.map((tab) => (
            <li key={tab.id}>
              <button
                className={`w-full p-2 ${
                  activeTab === tab.id ? "bg-blue-400" : "bg-gray-200"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.content}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="ml-6 w-[700px] ">
        {activeTab == 1 && <Xeplich></Xeplich>}
        {activeTab == 2 && <p>cai dat thoi gian</p>}
        {activeTab == 3 && <HocPhan />}
        {activeTab == 4 && <BieuMau></BieuMau>}
      </div>
      
      {/* <div className="w-96 h-96">
        <PDFViewerComponent></PDFViewerComponent>
      </div> */}
      <div className="">
      <EventSoict></EventSoict>
      
      </div>
      
    </div>
  );
};
export default HomePageGiaoVu;
