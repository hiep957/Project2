import { useContext, useEffect, useState } from "react";
import Modal from "../component/Modal";
import { AuthContext } from "../contexts/AuthContext";
import * as XLSX from "xlsx"; // Import thư viện xlsx

type PhongMay = {
  id: string;
  status: string;
}

const DanhSachPhongMay = () => {
  const authContext = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [room, setRoom] = useState<PhongMay[]>([]);
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await postPhongMay({ id, status });
    getPhongMay().then((data) => setRoom(data));
  };

  const getPhongMay = async () => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      "https://19df-42-113-220-219.ngrok-free.app/api/v1/room",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

  useEffect(() => {
    getPhongMay().then(data => setRoom(data));
  }, []);

  const postPhongMay = async (data: any) => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      "https://19df-42-113-220-219.ngrok-free.app/api/v1/room",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const updatePhongMay = async (roomId: string, status: any) => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      `https://19df-42-113-220-219.ngrok-free.app/api/v1/room/${roomId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ "status": status }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const handleUpdate = (id: string, status: string) => {
    const newStatus = status === "Sẵn sàng" ? "Bận" : "Sẵn sàng";
    updatePhongMay(id, newStatus).then(() => getPhongMay().then(data => setRoom(data)));
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(room);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSachPhongMay");
    XLSX.writeFile(workbook, "DanhSachPhongMay.xlsx");
  };

  return (
    <div className="w-4/6 mx-auto mt-10 flex flex-col space-y-6">
      <h1 className="text-2xl font-bold text-center mb-4">Danh Sách Phòng Máy Hiện Có</h1>
      <div className="grid grid-cols-4 gap-4">
        {room && room.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg shadow-lg flex flex-col items-center">
            <div className="font-semibold">{item.id}</div>
            <div className="text-sm text-gray-600">Trạng thái: {item.status}</div>
            <button onClick={() => handleUpdate(item.id, item.status)}>Sửa</button>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          onClick={() => setShowModal(true)}
        >
          Thêm phòng máy
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 ml-4"
          onClick={exportToExcel}
        >
          Xuất Excel
        </button>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên phòng máy:
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Trạng thái:
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </label>
          </div>
          <div className="text-center">
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600">
              Thêm
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DanhSachPhongMay;
