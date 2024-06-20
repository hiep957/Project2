import { useContext, useEffect, useState } from "react";
import EventSoict from "../component/EventSoict";
import Sidebar from "../component/Nav";
import Modal from "../component/Modal";
import { AuthContext } from "../contexts/AuthContext";

type PhanCong = {
  course: {
    id: string;
    name: string;
    creditInfo: string;
  };
  courseId: string;
  instructorId: string;
  semester: string;
};
const ThemLichThi = () => {
  const authContext = useContext(AuthContext);
  const [courseData, setCourseData] = useState<PhanCong[]>([]);
  const [showModal, setShowModal] = useState(false);
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
  useEffect(() => {
    getHocPhan().then((data) => {
      setCourseData(data);
      console.log(courseData);
    });
  }, []);
  return (
    <div className="flex flex-row">
      <div className="w-1/6">
        <Sidebar />
      </div>

      <div className="w-4/6 p-4 border-r border-l">
        <div>Thêm lịch thi</div>
        <div>Có {courseData.length} môn được phân công xếp lịch</div>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Mã môn</th>
              <th className="px-4 py-2">Tên môn</th>
              <th className="px-4 py-2">Số tín chỉ</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {courseData.map((course, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{course.course.id}</td>
                <td className="border px-4 py-2">{course.course.name}</td>
                <td className="border px-4 py-2">{course.course.creditInfo}</td>
                {/* Add more cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>

        
      </div>

      <div className="flex flex-end ml-8">
        <EventSoict></EventSoict>
      </div>
    </div>
  );
};

export default ThemLichThi;
