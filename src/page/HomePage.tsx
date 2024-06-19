import { useContext, useEffect, useState } from "react";
import EventSoict from "../component/EventSoict";
import Swiper1 from "../component/Swiper";
import { AuthContext } from "../contexts/AuthContext";

export type examData = {
  examId: string;
  week: string;
  day: string;
  date: string;
  classId: string;
  courseId: string;
  courseName: string;
  studyGroup: string;
  numbOrder: number;
  room: string;
  sessionId: string;
  type: string;
};

export type infoStudent = {
  id: string;
  name: string;
  groupName: string;
  email: string;
};

const URL_API = import.meta.env.SERVER || "";

const HomePage = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return;
  }
  const { accessToken } = authContext;
  const [scheduleData, setScheduleData] = useState<examData[] | undefined>([]);
  const [studentData, setStudentData] = useState<infoStudent | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://19df-42-113-220-219.ngrok-free.app/api/v1/exam-class/student-schedule",
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              semester: "2023.1",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: examData[] = await response.json();
        setScheduleData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://19df-42-113-220-219.ngrok-free.app/api/v1/student",
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: infoStudent = await response.json();
        setStudentData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mb-4 p-4 bg-white shadow-md rounded-lg">
        <Swiper1 />
      </div>
      <div className="flex gap-x-5 mt-2 p-4 bg-white shadow-md rounded-lg border-t ">
        <div className="flex flex-col items-center bg-white gap-y-4 w-5/6 border-l border-r p-4">
          <div className="border-b w-full">
            <span className="flex items-center justify-center p-2">
              <div className="bg-blue-100 p-2 rounded">Tra cứu lịch thi</div>
            </span>
          </div>
          <div className="w-full mt-4">
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <h2 className="text-lg font-semibold mb-2">Thông tin sinh viên</h2>
              <p className="mb-1"><span className="font-semibold">Họ và tên:</span> {studentData?.name}</p>
              <p className="mb-1"><span className="font-semibold">MSSV:</span> {studentData?.id}</p>
              <p className="mb-1"><span className="font-semibold">Lớp:</span> {studentData?.groupName}</p>
              <p className="mb-1"><span className="font-semibold">Email:</span> {studentData?.email}</p>
            </div>
            <div>
              <span>Bạn có {scheduleData?.length} lớp thi</span>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="w-full bg-gray-100 border-b">
                    <th className="text-left p-2 border-r">Mã Lớp</th>
                    <th className="text-left p-2 border-r">Mã Học Phần</th>
                    <th className="text-left p-2 border-r">Tên Học Phần</th>
                    <th className="text-left p-2 border-r">Ngày Thi</th>
                    <th className="text-left p-2 border-r">Thứ</th>
                    <th className="text-left p-2 border-r">Tuần</th>
                    <th className="text-left p-2 border-r">Phòng</th>
                    <th className="text-left p-2 border-r">Ca</th>
                    <th className="text-left p-2 border-r">Nhóm</th>
                    <th className="text-left p-2">Loại</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData &&
                    scheduleData.map((data) => (
                      <tr key={data.examId} className="border-b hover:bg-gray-50">
                        <td className="p-2 border-r">{data.classId}</td>
                        <td className="p-2 border-r">{data.courseId}</td>
                        <td className="p-2 border-r">{data.courseName}</td>
                        <td className="p-2 border-r">{data.date}</td>
                        <td className="p-2 border-r">{data.day}</td>
                        <td className="p-2 border-r">{data.week}</td>
                        <td className="p-2 border-r">{data.room}</td>
                        <td className="p-2 border-r">{data.sessionId}</td>
                        <td className="p-2 border-r">{data.studyGroup}</td>
                        <td className="p-2">{data.type}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-1/6 p-2 border-b">
          <div className="mb-3">
            <span className="flex items-center justify-center bg-blue-100 rounded p-2">
                    Sự kiện nổi bật
            </span>
          </div>
          <EventSoict />
        </div>
      </div>
      <div className="p-4 bg-white shadow-md rounded-lg">
        <p>Xin chào</p>
      </div>
    </div>
  );
};

export default HomePage;
