import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

type KipThi = {
  id: string;
  label: string;
  courseId: string;
  start: string;
  end: string;
};

const CaiDatThoiGian = () => {
  const authContext = useContext(AuthContext);
  const [label, setLabel] = useState("");
  const [start1, setStart1] = useState("");
  const [end1, setEnd1] = useState("");
  const [kipthi, setKipthi] = useState<KipThi[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const start = start1.replace(":", "h");
    const end = end1.replace(":", "h");
    await postexamSession({ label, start, end });
    getExamSession().then((data) => setKipthi(data));
  };

  const getExamSession = async () => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      "https://19df-42-113-220-219.ngrok-free.app/api/v1/exam-session",
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

  const postexamSession = async (data: any) => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      "https://19df-42-113-220-219.ngrok-free.app/api/v1/exam-session",
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

  useEffect(() => {
    getExamSession().then((data) => setKipthi(data));
  }, []);

  return (
    <div className="flex flex-row items-center p-6 bg-gray-100 min-h-screen">
      <div>
        Lớp thi giảng đường và lớp thi phòng máy
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md p-6 bg-white shadow-md rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Thêm Kíp Thi</h2>
        <label className="flex flex-col">
          Tên kíp:
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <label className="flex flex-col">
          Thời gian bắt đầu:
          <input
            type="time"
            value={start1}
            onChange={(e) => setStart1(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <label className="flex flex-col">
          Thời gian kết thúc:
          <input
            type="time"
            value={end1}
            onChange={(e) => setEnd1(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <button
          type="submit"
          className="mt-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Thêm Kíp
        </button>
      </form>

      <div className="mt-10 w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Danh Sách Kíp Thi</h2>
        <div className="space-y-2">
          {kipthi && kipthi.map((item) => (
            <div key={item.id} className="flex flex-col bg-gray-100 p-2 rounded shadow">
              <div className="font-semibold">Kíp {item.label}</div>
              <div className="text-sm">Bắt đầu: {item.start}</div>
              <div className="text-sm">Kết thúc: {item.end}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaiDatThoiGian;
