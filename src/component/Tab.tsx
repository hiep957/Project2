// import { Path } from "@react-pdf/renderer";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const tabData = [
  { id: 1, content: "Xếp lịch",path:'xeplich' },
  { id: 2, content: "Cài đặt thời gian",path:'caidatthoigian' },
  { id: 3, content: "Học phần", path:'hocphan' },
  { id: 4, content: "Biểu mẫu", path:'bieumau' },
];
const Tab = () => {
  const [activeTab, setActiveTab] = useState(1);
  // const location = useLocation();
  //   const handleButon = () => {
  //     setActiveTab()
  //   }
  return (
    <div className="flex flex-col items-center ml-3 ">
      <ul className=" space-y-3  ">
        {tabData.map((tab) => (
          <li className="" key={tab.id}>
            <NavLink
            to={tab.path}>
              <button
                className={`w-full p-2 ${
                  activeTab === tab.id ? "bg-blue-400" : "bg-gray-200"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.content}
              </button>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tab;
