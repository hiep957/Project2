import { useContext, useEffect, useState } from "react";
import EventSoict from "../component/EventSoict";
import Sidebar from "../component/Nav";
import Modal from "../component/Modal";
import { AuthContext } from "../contexts/AuthContext";

type time_table = {
  cl_id: string;
  cl_semester: string;
  cl_lesson: string;
  cl_classNote: string;
  cl_program: string;
  cl_semesterType: string;
  cl_timeTable: string;
  cl_classType: string;
  cl_department: string;
  cl_courseId: string;
  courseName: string;
};

const GiaoVien = () => {
  const authContext = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [timeTable, setTimeTable] = useState<time_table[]>([]);
  
  const getHocPhan = async () => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      "https://19df-42-113-220-219.ngrok-free.app/api/v1/instructor/permission?semester=2023.1",
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

  const getLichThi = async () => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      "https://19df-42-113-220-219.ngrok-free.app/api/v1/class/time-table",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${accessToken}`,
          semester: "2023.1",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  useEffect(() => {
    getHocPhan().then((data) => {
      console.log(data);
    });
  }, []);

  useEffect(() => {
    getLichThi().then((data) => {
      setTimeTable(data), console.log(data);
    });
  }, []);
  
  return (
    <div className="flex flex-row min-h-screen ">
      <div className="w-1/6 bg-white shadow-md">
        <Sidebar />
      </div>
      <div className="w-4/6 p-8 bg-white shadow-md border-r border-l rounded-lg mx-4">
        <div className="text-xl font-bold mb-4">Có tổng cộng {timeTable.length} lớp giảng dạy</div>
        <div className="flex flex-col items-center justify-center mt-4">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2 text-left">Mã lớp</th>
                <th className="border px-4 py-2 text-left">Môn học</th>
                <th className="border px-4 py-2 text-left">Thời gian</th>
                <th className="border px-4 py-2 text-left">Lớp</th>
              </tr>
            </thead>
            <tbody>
              {timeTable.map((item) => (
                <tr key={item.cl_id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{item.cl_id}</td>
                  <td className="border px-4 py-2">{item.courseName}</td>
                  <td className="border px-4 py-2">{item.cl_timeTable}</td>
                  <td className="border px-4 py-2">{item.cl_classNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-1/6 ml-4">
        <EventSoict />
      </div>
    </div>
  );
};

export default GiaoVien;
