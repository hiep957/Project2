import { useState } from "react";
import Modal from "../component/Modal";

const dataDanhSachPhongMay = [
  { id: "B1-201", status: "Sẵn sàng" },
  { id: "B1-202", status: "Sẵn sàng" },
  { id: "B1-203", status: "Sẵn sàng" },
  { id: "B1-204", status: "Sẵn sàng" },
  { id: "B1-205", status: "Sẵn sàng" },
];

const DanhSachPhongMay = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="w-4/6 flex flex-col">
      <div>Danh Sách phòng máy hiện có</div>
      <div className="grid grid-cols-4 space-x-2 space-y-2 mt-4">
        {dataDanhSachPhongMay.map((item) => {
          return (
            <div className="border flex items-center flex-col ">
              <div>{item.id}</div>
              <div>Trạng thái: {item.status}</div>
            </div>
          );
        })}
      </div>

      <div>
        <button
          className="p-2 bg-blue-100 mt-4 rounded"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Thêm phòng máy
        </button>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <form>
            <label htmlFor="">
              Tên phòng máy:
              <input type="text" />
            </label>
            <label htmlFor="">
              Trạng thái:
              <input type="text" />
            </label>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default DanhSachPhongMay;
