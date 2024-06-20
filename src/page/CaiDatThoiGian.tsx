import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const URL_BE = import.meta.env.VITE_SERVER_URL || " ";
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
    try {
      await postExamSession({ label, start, end });
      toast.success('Kíp thi đã được thêm thành công!');
      getExamSession().then((data) => setKipthi(data));
    } catch (error) {
      console.error("Error adding exam session:", error);
      toast.error('Đã xảy ra lỗi khi thêm kíp thi.');
    }
  };

  const getExamSession = async () => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      `${URL_BE}/api/v1/exam-session`,
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

  const postExamSession = async (data: any) => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      `${URL_BE}/api/v1/exam-session`,
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

  const deleteExamSession = async (id: string) => {
    if (!authContext) {
      return;
    }
    try {
      const { accessToken } = authContext;
      const response = await fetch(
        `${URL_BE}/api/v1/exam-session/${id}`,
        {
          method: "DELETE",
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
      toast.success('Kíp thi đã được xóa thành công!');
      getExamSession().then((data) => setKipthi(data));
    } catch (error) {
      console.error("Error deleting exam session:", error);
      toast.error('Đã xảy ra lỗi khi xóa kíp thi.');
    }
  };

  useEffect(() => {
    getExamSession().then((data) => setKipthi(data));
  }, []);

  return (
    <div className="flex flex-row items-center p-6 bg-gray-100 min-h-screen space-x-4">
      <ToastContainer />
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
          {kipthi &&
            kipthi.map((item) => (
              <div key={item.id} className="flex flex-col bg-gray-100 p-2 rounded shadow">
                <div className="font-semibold">Kíp {item.label}</div>
                <div className="text-sm">Bắt đầu: {item.start}</div>
                <div className="text-sm">Kết thúc: {item.end}</div>
                <button
                  onClick={() => deleteExamSession(item.id)}
                  className="mt-2 py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.5 3a1 1 0 00-1 1V4h-1v1h1v9a2 2 0 002 2h3a2 2 0 002-2V5h1V4h-1v-.01a1 1 0 00-1-1h-4zM6 5h7v9a1 1 0 01-1 1h-3a1 1 0 01-1-1V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CaiDatThoiGian;
