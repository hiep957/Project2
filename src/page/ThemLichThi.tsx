

import {  useState } from "react";
import EventSoict from "../component/EventSoict";
import Sidebar from "../component/Nav";
import Modal from "../component/Modal";


const ThemLichThi = () => {
  
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-row">
      <div className="w-1/6">
        <Sidebar />
      </div>

      <div className="w-1/2 p-4 border-r border-l">
        <div>Thêm lịch thi</div>
      </div>

      <div className="flex flex-end ml-8">
        <EventSoict></EventSoict>
      </div>
    </div>
  );
};

export default ThemLichThi;
