import { useContext, useState } from "react";
import EventSoict from "../component/EventSoict";
import Sidebar from "../component/Nav";
import Modal from "../component/Modal";


const GiaoVien = () => {
  
  

  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-row">
      <div className="w-1/6">
        <Sidebar />
      </div>

      <div className="w-1/2 p-4 border-r border-l">
        <div>Có tổng cộng 3 lớp toán rời rạc</div>
        <div className="flex flex-col items-center justify-center mt-4">
          <div className="flex flex-row bg-slate-300 w-3/4 justify-around p-2 items-start  rounded-md text-xl">
            <div className="flex flex-col">
              <div>738962 - Toán rời rạc</div>
              <div>Giờ học: 7h5 - 9h10</div>
              <div>Số sinh viên: m</div>
            </div>
            <div className="flex flex-col">
              <div>Tuần học: 1-16</div>
              <div>Phòng học: C2-201</div>
              <div>Mã lớp thi: 1234</div>
            </div>
          </div>
          <button
            className="bg-slate-100 p-2 rounded text-sm mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Xem danh sách sinh viên
          </button>
          <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
            <div className="">Danh sách học sinh</div>
            <div>1. Mã Tiến Hiệp - 20215365</div>
            <div></div>
          </Modal>
        </div>
      </div>

      <div className="flex flex-end ml-8">
        <EventSoict></EventSoict>
      </div>
    </div>
  );
};

export default GiaoVien;
